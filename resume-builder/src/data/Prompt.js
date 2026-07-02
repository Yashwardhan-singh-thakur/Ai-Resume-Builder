export function resumeSummaryPrompt(jobTitle) {
  return `Generate 3 professional resume summaries for the job title: ${jobTitle}.

Create exactly these 3 categories:
1. Fresher
2. Mid-Level
3. Experienced

Rules:
- Write in simple, professional English English.
- Each summary should be 3 to 4 lines only.
- Make each summary ATS-friendly.
- Do not add fake company names.
- Do not add unrealistic or fake achievements.
- Keep the Fresher summary focused on skills, learning ability, projects, problem-solving, and career goals.
- Keep the Mid-Level summary focused on practical experience, teamwork, problem-solving, tools, and growth.
- Keep the Experienced summary focused on leadership, strong technical skills, project ownership, business impact, and mentoring.
- The tone should sound confident but realistic.
- Return the answer in this exact format:

Fresher:
[summary here]

Mid-Level:
[summary here]

Experienced:
[summary here]`;
}

export function experiencePrompt(positionTitle) {
  return `Generate a professional resume experience section for the position title: ${positionTitle}.

Rules:
- Write in simple, professional English.
- Generate exactly 6 bullet points.
- Make the points ATS-friendly.
- Focus on responsibilities, tools, problem-solving, teamwork, and project work.
- Do not add fake company names.
- Do not add fake numbers, fake percentages, or unrealistic achievements.
- Keep the tone confident but realistic.
- Each bullet point should be short and resume-friendly.
- Use action verbs like Developed, Designed, Implemented, Managed, Collaborated, Improved.
- Return only a JSON array of strings.
- Do not add numbering.
- Do not add bullet symbols.
- Do not add markdown.
- Do not add extra text.`;
}
