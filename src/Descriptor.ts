export class Describer {
  /**
   * Describe class
   * @param typeOfClass
   */
  static describeClass(typeOfClass: any) {
    const a = new typeOfClass()
    return this.describeInstance(a)
  }

  /**
   * Get property names for isntance
   * @param instance
   */
  static describeInstance(instance: any) {
    if (!instance) {
      return null
    }
    return Object.getOwnPropertyNames(instance)
  }
}
