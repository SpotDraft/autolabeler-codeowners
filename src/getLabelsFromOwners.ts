import randomColor from 'randomcolor'

export interface Label {
  name: string
  color: string
}

export async function getLabelsFromOwners(
  owners: Set<string>
): Promise<Set<Label>> {
  const labels: Set<Label> = new Set([])
  for (const owner of owners) {
    const owner_split = owner.split("/", 2);
    const str_concat = new String('pod/');
    const owner_updated = str_concat.concat(owner_split[1].toString());
    labels.add({
      name: `${owner_updated}`,
      // From the documentation: https://octokit.github.io/rest.js/#octokit-routes-issues-create-label
      // > The hexadecimal color code for the label, without the leading #
      // randomcolor() returns a color code with a '#' prefix, so we remove it
      color: randomColor().substr(1)
    })
  }
  return labels
}
