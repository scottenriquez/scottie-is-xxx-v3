class NVector {
  constructor(...components) {
    this.components = components;
  }

  get dimensions() {
    return this.components.length;
  }

  // assumes that the second vector has the same dimensions as the first
  add(otherVector) {
    return new NVector(
      ...this.components.map((component, index) => component + otherVector.components[index])
    );
  }
}
