const splitDisplayName = (name: string | null | undefined) => {
  if (!name) {
    return { firstName: undefined,  lastName: undefined}
  }
  const [firstName, lastName] = name.split(' ')
  return { firstName, lastName }
}

export default splitDisplayName