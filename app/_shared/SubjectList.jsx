export default [
  {
    id: 1,
    name: "Grundlagen",
    icon: "/grundlagen.png",
    prompt: '',
  },
  {
    id: 2,
    name: "Analysis",
    icon: "/analysis.png",
    prompt: '',
  },
  {
    id: 3,
    name: "Geometrie",
    icon: "/geometrie.png",
    prompt: '',
  },
  {
    id: 4,
    name: "Stochastik",
    icon: "/stochastik.png",
    prompt: ''
  },
].sort((a, b) => {
  const nameA = a.name.toUpperCase(); // ignore upper and lowercase
  const nameB = b.name.toUpperCase(); // ignore upper and lowercase
  if (nameA < nameB) {
    return -1;
  }
  if (nameA > nameB) {
    return 1;
  }

  // names must be equal
  return 0;
})
