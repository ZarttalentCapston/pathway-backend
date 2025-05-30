// utils/skillExtractor.ts

const knownSkills = [
  'JavaScript', 'TypeScript', 'React', 'Node.js',
  'Python', 'Django', 'Flask', 'SQL', 'MongoDB',
  'Git', 'HTML', 'CSS', 'AWS', 'Docker', 'Kubernetes'
];

export function extractSkillsFromText(answer: string): string[] {
  const skills: string[] = [];

  knownSkills.forEach(skill => {
    const regex = new RegExp(`\\b${skill}\\b`, 'i'); // match whole word, case-insensitive
    if (regex.test(answer)) {
      skills.push(skill);
    }
  });

  return skills;
}
