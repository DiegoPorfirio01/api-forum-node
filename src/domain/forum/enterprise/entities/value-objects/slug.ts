export class Slug {
  public value: string

  constructor(value: string) {
    this.value = value
  }

  /**
   * Receives a string and normalize it as a slug
   *
   * Example:"An example title" => "an-example-title"
   *
   * @param text (string)
   * @returns
   */
  static createFromText(text: string) {
    const slug = text
      .normalize('NFKD')
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')

    return new Slug(slug)
  }
}
