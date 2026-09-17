use regex::RegexSet;
use std::sync::OnceLock;

static PII_REGEX_SET: OnceLock<(RegexSet, Vec<regex::Regex>)> = OnceLock::new();

fn get_pii_patterns() -> &'static (RegexSet, Vec<regex::Regex>) {
    PII_REGEX_SET.get_or_init(|| {
        let pattern_strs = vec![
            // Email address regex
            r"(?i)[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}",
            // Credit card numbers (Visa, Mastercard, Amex)
            r"\b(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|3[47][0-9]{13})\b",
            // US SSN format (\d{3}-\d{2}-\d{4})
            r"\b\d{3}-\d{2}-\d{4}\b",
        ];

        let set = RegexSet::new(&pattern_strs).unwrap();
        let regexes = pattern_strs
            .into_iter()
            .map(|p| regex::Regex::new(p).unwrap())
            .collect();

        (set, regexes)
    })
}

/// Real-time string parser scanning text for sensitive PII.
/// Replaces matched substrings with `[REDACTED_PII]` as required by PRD Scenario D.
pub fn mask_pii_string(input: &str) -> String {
    if input.is_empty() {
        return input.to_string();
    }

    let (set, regexes) = get_pii_patterns();
    let matches = set.matches(input);

    if !matches.matched_any() {
        return input.to_string();
    }

    let mut sanitized = input.to_string();
    for index in matches {
        sanitized = regexes[index].replace_all(&sanitized, "[REDACTED_PII]").to_string();
    }

    sanitized
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_mask_pii_email() {
        let input = "Working on project - contact admin@enterprise.com for details";
        let masked = mask_pii_string(input);
        assert_eq!(masked, "Working on project - contact [REDACTED_PII] for details");
    }

    #[test]
    fn test_mask_pii_credit_card() {
        let input = "Payment page 4111111111111111 checkout";
        let masked = mask_pii_string(input);
        assert_eq!(masked, "Payment page [REDACTED_PII] checkout");
    }

    #[test]
    fn test_mask_pii_ssn() {
        let input = "Form 123-45-6789 submission";
        let masked = mask_pii_string(input);
        assert_eq!(masked, "Form [REDACTED_PII] submission");
    }
}
