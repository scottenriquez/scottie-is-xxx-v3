class NVector {
  constructor(...components) {
    this.components = components;
  }

  get dimensions() {
    return this.components.length;
  }

  // assumes that the second vector has the same dimensions as the first
  add(otherVector) {
    return new NVector(...this.components.map((component, index) => component + otherVector.components[index]));
  }

  // assumes that the second vector has the same dimensions as the first
  subtract(otherVector) {
    return new NVector(...this.components.map((component, index) => component - otherVector.components[index]));
  }

  scale(scalar) {
    return new NVector(...this.components.map((component) => component * scalar));
  }

  // assumes that the second vector has the same dimensions as the first
  dot(otherVector) {
    return this.components.reduce((sum, component, index) => sum + component * otherVector.components[index], 0);
  }
}
