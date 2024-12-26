/**
 * StandardResponse interface
 * @template T
 * @interface
 */
function StandardResponse() {
  /**
   * Status code
   * @type {number}
   */
  this.statusCode = 0;

  /**
   * Message
   * @type {string|undefined}
   */
  this.msg = undefined;

  /**
   * Data
   * @type {T|undefined}
   */
  this.data = undefined;

  /**
   * Page count
   * @type {number|undefined}
   */
  this.pageCount = undefined;
}
