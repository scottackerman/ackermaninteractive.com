export default {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "TODO: The name of our home page",
  "description": "TODO: The description of our home page",
  "mainEntity": {
    "@type": "ItemList",
    "itemListElement": [
      // A node for each project card on the homepage
      {
        "@type": "Medicalproject",
        "name": "TODO: project Name",
        "description": "TODO: project description",
        "status": "TODO: project Status",
        "sponsor": {
          "@type": "Organization",
          "name": "TODO: Sponsor name",
          "url": "TODO: Sponsor website"
        },
        "studySubject": {
          "@type": "MedicalCondition",
          "name": "TODO: Study Condition"
        },
        "studyLocation": [
          {
          "@type": "MedicalClinic",
          "name": "TODO: Study location name",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "TODO: Study street location",
            "addressLocality": "TODO: Study city",
            "addressRegion": "TODO: Study State",
            "postalCode": "TODO: Study zip",
            "addressCountry": "TODO: Study country"
            }
          }
        ],
        "startDate": "TODO: 2025-05-01",
        "endDate": "TODO: 2026-06-30",
        "identifier": "TODO: .gov id for this project",
        "url": "TODO: Canonical url to our production homepage",
        "phase": "TODO: https://schema.org/MedicalprojectPhase/Phase3", // This will be a link to schema.org, we need to make sure it's pointing to the right phase number.
        "studyDesign": "TODO: (Randomized, Double-Blind, Placebo-Controlled, etc)",
        "projectDesign": "TODO: (Parallel Group, Factorial Assignment, etc)",
        "population": "TODO: (Adults aged 18-65 with condition..)",
        "principalInvestigator": {
          "@type": "Person",
          "name": "TODO: (Dr. David Brous)",
          "affiliation": {
            "@type": "Organization",
            "name": "TODO: (VCU Research Hospital)"
          }
        }
      }
      // ... More nodes for each project, DON'T FORGET COMMA ^
    ]
  }
}