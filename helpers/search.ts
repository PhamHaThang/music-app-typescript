interface ObjectSearch {
  keyword: string;
  regex?: RegExp;
}
const searchHelper = (keyword: string): ObjectSearch => {
  let objectSearch: ObjectSearch = {
    keyword: "",
  };
  if (keyword) {
    objectSearch.keyword = keyword;

    const regex = new RegExp(objectSearch.keyword, "i");
    objectSearch.regex = regex;
  }
  return objectSearch;
};
export default searchHelper;
