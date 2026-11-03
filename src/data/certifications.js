// Each course is a single credential: a Cisco badge and its completion certificate
// represent the same achievement, not two separate certificates.
const credentials = [
  { id: 'html', title: 'HTML Essentials', issuer: 'Cisco Networking Academy', provider: 'cisco', category: 'development', issued: '02 Sep 2026', certificateId: '3baaf20d-b262-474b-bb2f-447376f6c251', verificationUrl: 'https://www.credly.com/badges/ea5a2f30-e5f4-4c80-810a-cdccd15b301a', tags: ['HTML', 'Web fundamentals'] },
  { id: 'css', title: 'CSS Essentials', issuer: 'Cisco Networking Academy', provider: 'cisco', category: 'development', issued: '02 Sep 2026', certificateId: '40adb325-8465-473d-9cdf-28d7328d1330', verificationUrl: 'https://www.credly.com/badges/64b72413-8787-4fd4-b499-d3fe777c579e', tags: ['CSS', 'Web styling'] },
  { id: 'javascript-1', title: 'JavaScript Essentials 1', issuer: 'Cisco Networking Academy', provider: 'cisco', category: 'development', issued: '03 Sep 2026', certificateId: '767fad3f-fb31-4b18-ac68-810c3a39cb9f', verificationUrl: 'https://www.credly.com/badges/4d50bfcd-36dc-49f9-b825-e1779df27f35', tags: ['JavaScript', 'Programming'] },
  { id: 'javascript-2', title: 'JavaScript Essentials 2', issuer: 'Cisco Networking Academy', provider: 'cisco', category: 'development', issued: '03 Sep 2026', certificateId: '80ae2acd-21c5-4ddf-8517-b1ef499bac98', verificationUrl: 'https://www.credly.com/badges/d61735aa-0343-4696-a96c-79e60b734d82', tags: ['JavaScript', 'Advanced concepts'] },
  { id: 'operating-systems', title: 'Operating Systems Basics', issuer: 'Cisco Networking Academy', provider: 'cisco', category: 'it', issued: '03 Sep 2026', certificateId: 'ca60f423-cf4c-4534-941c-3b71c98474fc', verificationUrl: 'https://www.credly.com/badges/3ab11ea0-0457-416a-ae22-036299c8adf3', tags: ['Operating systems', 'IT fundamentals'] },
  { id: 'computer-hardware', title: 'Computer Hardware Basics', issuer: 'Cisco Networking Academy', provider: 'cisco', category: 'it', issued: '02 Sep 2026', certificateId: '674e0f0d-033c-4af6-ba02-bc60b8f12f39', verificationUrl: 'https://www.credly.com/badges/efc48803-d3c7-49f2-b22d-400fff1c8696', tags: ['Hardware', 'IT fundamentals'] },
  { id: 'customer-support', title: 'IT Customer Support Basics', issuer: 'Cisco Networking Academy', provider: 'cisco', category: 'it', issued: '01 Sep 2026', certificateId: null, verificationUrl: 'https://www.credly.com/badges/317b5eb7-30e1-49c0-803c-a9a7bad3637b', tags: ['Technical support', 'Customer service'] },
  { id: 'technical-support', title: 'Technical Support Fundamentals', issuer: 'Google · Coursera', provider: 'coursera', category: 'it', issued: '29 Aug 2026', certificateId: 'JSAB0CEKIF8Y', verificationUrl: 'https://www.coursera.org/verify/JSAB0CEKIF8Y', tags: ['IT support', 'Troubleshooting'] },
  { id: 'data-foundations', title: 'Foundations: Data, Data, Everywhere', issuer: 'Google · Coursera', provider: 'coursera', category: 'data', issued: '05 Aug 2026', certificateId: '3N3YL7IMMCB3', verificationUrl: 'https://www.coursera.org/verify/3N3YL7IMMCB3', tags: ['Data analytics', 'Data literacy'] },
  { id: 'excel', title: 'Excel Skills for Business: Essentials', issuer: 'Macquarie University · Coursera', provider: 'coursera', category: 'data', issued: '03 Aug 2026', certificateId: 'FVP4GV07CU34', verificationUrl: 'https://www.coursera.org/verify/FVP4GV07CU34', tags: ['Excel', 'Business productivity'] },
];

const filters = ['all', 'development', 'it', 'data'];

// A short curated opening gives both Cisco badges and Coursera certificates
// a place in the first row on every screen, without hiding other credentials
// from search filters or the expanded view.
const featuredIds = ['html', 'javascript-1', 'data-foundations', 'css', 'javascript-2', 'technical-support'];
const featuredCredentials = [
  ...featuredIds.map((id) => credentials.find((item) => item.id === id)),
  ...credentials.filter((item) => !featuredIds.includes(item.id)),
];

export { credentials, filters, featuredCredentials };
