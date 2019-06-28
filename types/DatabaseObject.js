/**
 * Flow Type Annotation for a Database Object inside of our main database Table. All required.
 */
type DatabaseObject = {
  id: string,
  item_type: string,
  marker: number,
  time_created: string,
}
export default DatabaseObject;