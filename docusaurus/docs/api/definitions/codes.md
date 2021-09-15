---
title: Codes
---

This endpoint allows the client to retrieve a list of Codes.

## GET /api/v1/codes

Code Lookup Service.

### Parameters

- **list** _(required)_ — The code list id.
- **code** _(optional)_ — The Provider Id to filter by. It is the last set digits of the id.
- **q** _(optional)_ - A list of search terms to filter by.
- **activeOnly** _(optional)_ - Return only active codes. Defaults to true.
- **consolidate** _(optional)_ - Collapse NDC codes based on EPA logic.
- **sortBy** _(optional)_ - The field to sort the results by. Allowed: value, code
- **sortDirection** _(optional)_ - The direction to sort the results. Allowed: asc, desc
- **codeOnly** _(optional)_ - The code only.
- **start** _(optional)_ - The first code in a range of codes
- **end** _(optional)_ - The last code in a range of codes

### Example Request

```
GET https://apps.availity.com/api/v1/codes?list=PDMTAXONOMY
```

### Example Response

```json
{
  "totalCount": 862,
  "count": 50,
  "offset": 0,
  "limit": 50,
  "links": {
    "next": {
      "href": "https://test-apps.availity.com/api/v1/codes?list=PDMTAXONOMY&offset=50&limit=50"
    },
    "last": {
      "href": "https://test-apps.availity.com/api/v1/codes?list=PDMTAXONOMY&offset=850&limit=50"
    },
    "self": {
      "href": "https://test-apps.availity.com/api/v1/codes?list=PDMTAXONOMY"
    }
  },
  "codes": [
    {
      "code": "251B00000X",
      "value": "AGENCIES&#x7c;CASE MANAGEMENT&#x7c;NOT APPLICABLE"
    },
    {
      "code": "251S00000X",
      "value": "AGENCIES&#x7c;COMMUNITY&#x2f;BEHAVIORAL HEALTH&#x7c;NOT APPLICABLE"
    },
    {
      "code": "251C00000X",
      "value": "AGENCIES&#x7c;DAY TRAINING, DEVELOPMENTALLY DISABLED SERVICES&#x7c;NOT APPLICABLE"
    },
    {
      "code": "252Y00000X",
      "value": "AGENCIES&#x7c;EARLY INTERVENTION PROVIDER AGENCY&#x7c;NOT APPLICABLE"
    },
    {
      "code": "253J00000X",
      "value": "AGENCIES&#x7c;FOSTER CARE AGENCY&#x7c;NOT APPLICABLE"
    },
    {
      "code": "251E00000X",
      "value": "AGENCIES&#x7c;HOME HEALTH&#x7c;NOT APPLICABLE"
    },
    {
      "code": "251F00000X",
      "value": "AGENCIES&#x7c;HOME INFUSION&#x7c;NOT APPLICABLE"
    },
    {
      "code": "251G00000X",
      "value": "AGENCIES&#x7c;HOSPICE CARE, COMMUNITY BASED&#x7c;NOT APPLICABLE"
    },
    {
      "code": "253Z00000X",
      "value": "AGENCIES&#x7c;IN HOME SUPPORTIVE CARE&#x7c;NOT APPLICABLE"
    },
    {
      "code": "251300000X",
      "value": "AGENCIES&#x7c;LOCAL EDUCATION AGENCY &#x28;LEA&#x29;&#x7c;NOT APPLICABLE"
    },
    {
      "code": "251J00000X",
      "value": "AGENCIES&#x7c;NURSING CARE&#x7c;NOT APPLICABLE"
    },
    {
      "code": "251T00000X",
      "value": "AGENCIES&#x7c;PACE PROVIDER ORGANIZATION&#x7c;NOT APPLICABLE"
    },
    {
      "code": "251K00000X",
      "value": "AGENCIES&#x7c;PUBLIC HEALTH OR WELFARE&#x7c;NOT APPLICABLE"
    },
    {
      "code": "251X00000X",
      "value": "AGENCIES&#x7c;SUPPORTS BROKERAGE&#x7c;NOT APPLICABLE"
    },
    {
      "code": "251V00000X",
      "value": "AGENCIES&#x7c;VOLUNTARY OR CHARITABLE&#x7c;NOT APPLICABLE"
    },
    {
      "code": "207KA0200X",
      "value": "ALLOPATHIC &amp; OSTEOPATHIC PHYSICIANS&#x7c;ALLERGY &amp; IMMUNOLOGY&#x7c;ALLERGY"
    },
    {
      "code": "207KI0005X",
      "value": "ALLOPATHIC &amp; OSTEOPATHIC PHYSICIANS&#x7c;ALLERGY &amp; IMMUNOLOGY&#x7c;CLINICAL &amp; LABORATORY IMMUNOLOGY"
    },
    {
      "code": "207K00000X",
      "value": "ALLOPATHIC &amp; OSTEOPATHIC PHYSICIANS&#x7c;ALLERGY &amp; IMMUNOLOGY&#x7c;NOT APPLICABLE"
    },
    {
      "code": "207LA0401X",
      "value": "ALLOPATHIC &amp; OSTEOPATHIC PHYSICIANS&#x7c;ANESTHESIOLOGY&#x7c;ADDICTION MEDICINE"
    },
    {
      "code": "207LC0200X",
      "value": "ALLOPATHIC &amp; OSTEOPATHIC PHYSICIANS&#x7c;ANESTHESIOLOGY&#x7c;CRITICAL CARE MEDICINE"
    },
    {
      "code": "207LH0002X",
      "value": "ALLOPATHIC &amp; OSTEOPATHIC PHYSICIANS&#x7c;ANESTHESIOLOGY&#x7c;HOSPICE AND PALLIATIVE MEDICINE"
    },
    {
      "code": "207L00000X",
      "value": "ALLOPATHIC &amp; OSTEOPATHIC PHYSICIANS&#x7c;ANESTHESIOLOGY&#x7c;NOT APPLICABLE"
    },
    {
      "code": "207LP2900X",
      "value": "ALLOPATHIC &amp; OSTEOPATHIC PHYSICIANS&#x7c;ANESTHESIOLOGY&#x7c;PAIN MEDICINE"
    },
    {
      "code": "207LP3000X",
      "value": "ALLOPATHIC &amp; OSTEOPATHIC PHYSICIANS&#x7c;ANESTHESIOLOGY&#x7c;PEDIATRIC ANESTHESIOLOGY"
    },
    {
      "code": "208U00000X",
      "value": "ALLOPATHIC &amp; OSTEOPATHIC PHYSICIANS&#x7c;CLINICAL PHARMACOLOGY&#x7c;NOT APPLICABLE"
    },
    {
      "code": "208C00000X",
      "value": "ALLOPATHIC &amp; OSTEOPATHIC PHYSICIANS&#x7c;COLON &amp; RECTAL SURGERY&#x7c;NOT APPLICABLE"
    },
    {
      "code": "207NI0002X",
      "value": "ALLOPATHIC &amp; OSTEOPATHIC PHYSICIANS&#x7c;DERMATOLOGY&#x7c;CLINICAL &amp; LABORATORY DERMATOLOGICAL IMMUNOLOGY"
    },
    {
      "code": "207ND0900X",
      "value": "ALLOPATHIC &amp; OSTEOPATHIC PHYSICIANS&#x7c;DERMATOLOGY&#x7c;DERMATOPATHOLOGY"
    },
    {
      "code": "207ND0101X",
      "value": "ALLOPATHIC &amp; OSTEOPATHIC PHYSICIANS&#x7c;DERMATOLOGY&#x7c;MOHS-MICROGRAPHIC SURGERY"
    },
    {
      "code": "207N00000X",
      "value": "ALLOPATHIC &amp; OSTEOPATHIC PHYSICIANS&#x7c;DERMATOLOGY&#x7c;NOT APPLICABLE"
    },
    {
      "code": "207NP0225X",
      "value": "ALLOPATHIC &amp; OSTEOPATHIC PHYSICIANS&#x7c;DERMATOLOGY&#x7c;PEDIATRIC DERMATOLOGY"
    },
    {
      "code": "207NS0135X",
      "value": "ALLOPATHIC &amp; OSTEOPATHIC PHYSICIANS&#x7c;DERMATOLOGY&#x7c;PROCEDURAL DERMATOLOGY"
    },
    {
      "code": "204R00000X",
      "value": "ALLOPATHIC &amp; OSTEOPATHIC PHYSICIANS&#x7c;ELECTRODIAGNOSTIC MEDICINE&#x7c;NOT APPLICABLE"
    },
    {
      "code": "207PE0004X",
      "value": "ALLOPATHIC &amp; OSTEOPATHIC PHYSICIANS&#x7c;EMERGENCY MEDICINE&#x7c;EMERGENCY MEDICAL SERVICES"
    },
    {
      "code": "207PH0002X",
      "value": "ALLOPATHIC &amp; OSTEOPATHIC PHYSICIANS&#x7c;EMERGENCY MEDICINE&#x7c;HOSPICE AND PALLIATIVE MEDICINE"
    },
    {
      "code": "207PT0002X",
      "value": "ALLOPATHIC &amp; OSTEOPATHIC PHYSICIANS&#x7c;EMERGENCY MEDICINE&#x7c;MEDICAL TOXICOLOGY"
    },
    {
      "code": "207P00000X",
      "value": "ALLOPATHIC &amp; OSTEOPATHIC PHYSICIANS&#x7c;EMERGENCY MEDICINE&#x7c;NOT APPLICABLE"
    },
    {
      "code": "207PP0204X",
      "value": "ALLOPATHIC &amp; OSTEOPATHIC PHYSICIANS&#x7c;EMERGENCY MEDICINE&#x7c;PEDIATRIC EMERGENCY MEDICINE"
    },
    {
      "code": "207PS0010X",
      "value": "ALLOPATHIC &amp; OSTEOPATHIC PHYSICIANS&#x7c;EMERGENCY MEDICINE&#x7c;SPORTS MEDICINE"
    },
    {
      "code": "207PE0005X",
      "value": "ALLOPATHIC &amp; OSTEOPATHIC PHYSICIANS&#x7c;EMERGENCY MEDICINE&#x7c;UNDERSEA AND HYPERBARIC MEDICINE"
    },
    {
      "code": "207QA0401X",
      "value": "ALLOPATHIC &amp; OSTEOPATHIC PHYSICIANS&#x7c;FAMILY MEDICINE&#x7c;ADDICTION MEDICINE"
    },
    {
      "code": "207QA0000X",
      "value": "ALLOPATHIC &amp; OSTEOPATHIC PHYSICIANS&#x7c;FAMILY MEDICINE&#x7c;ADOLESCENT MEDICINE"
    },
    {
      "code": "207QA0505X",
      "value": "ALLOPATHIC &amp; OSTEOPATHIC PHYSICIANS&#x7c;FAMILY MEDICINE&#x7c;ADULT MEDICINE"
    },
    {
      "code": "207QG0300X",
      "value": "ALLOPATHIC &amp; OSTEOPATHIC PHYSICIANS&#x7c;FAMILY MEDICINE&#x7c;GERIATRIC MEDICINE"
    },
    {
      "code": "207QH0002X",
      "value": "ALLOPATHIC &amp; OSTEOPATHIC PHYSICIANS&#x7c;FAMILY MEDICINE&#x7c;HOSPICE AND PALLIATIVE MEDICINE"
    },
    {
      "code": "207Q00000X",
      "value": "ALLOPATHIC &amp; OSTEOPATHIC PHYSICIANS&#x7c;FAMILY MEDICINE&#x7c;NOT APPLICABLE"
    },
    {
      "code": "207QB0002X",
      "value": "ALLOPATHIC &amp; OSTEOPATHIC PHYSICIANS&#x7c;FAMILY MEDICINE&#x7c;OBESITY MEDICINE"
    },
    {
      "code": "207QS1201X",
      "value": "ALLOPATHIC &amp; OSTEOPATHIC PHYSICIANS&#x7c;FAMILY MEDICINE&#x7c;SLEEP MEDICINE"
    },
    {
      "code": "207QS0010X",
      "value": "ALLOPATHIC &amp; OSTEOPATHIC PHYSICIANS&#x7c;FAMILY MEDICINE&#x7c;SPORTS MEDICINE"
    },
    {
      "code": "208D00000X",
      "value": "ALLOPATHIC &amp; OSTEOPATHIC PHYSICIANS&#x7c;GENERAL PRACTICE&#x7c;NOT APPLICABLE"
    }
  ]
}
```
