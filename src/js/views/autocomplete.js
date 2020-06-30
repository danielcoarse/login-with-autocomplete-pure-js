export class Autocomplete {
  constructor(obj, data) {
    this.input = obj.input;
    this.wrap = obj.wrap;
    this.list = obj.list;
    this.item = null;
    this.data = data;
    this.matches = [];
  }

  searchValue(value, data) {
    return data.toUpperCase().search(value.toUpperCase());
  }

  setItemInList(item, text) {
    item.textContent = text;
    this.list.appendChild(item);
  }

  activeList() {
    this.wrap.classList.add("active");
  }

  deactiveList() {
    this.wrap.classList.remove("active");
  }

  clearList() {
    this.list.innerHTML = "";
  }

  itemTemplete() {
    const item = document.createElement("div");
    item.classList.add("autocomplete-item");
    return item;
  }

  onInputHandler() {
    let value = this.input.value;

    if (!value) {
      this.clearList();
      this.matches = [];
      return this.deactiveList();
    }

    this.clearList();
    this.matches = [];

    Object.values(this.data).forEach((el, i) => {
      const search = this.searchValue(value, el);
      if (search === -1) return false;
      this.matches.push(i + 1);

      const item = this.itemTemplete();
      this.item = item;
      this.setItemInList(item, el);
      this.activeList();

      if (this.input.classList.contains("filled"))
        item.classList.remove("filled");
      
    });
  }
  async onClickHandler() {
    this.input.value = this.item.textContent;
    this.clearList();
    this.deactiveList();
    this.input.classList.add("filled");
    this.index = await this.matches[0];
  }
}
