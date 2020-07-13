/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
let mergeTwoLists = function (l1, l2) {
  let list = new ListNode(0);
  // Keep a reference to the original initial value
  let head = list;

  while (l1 !== null && l2 !== null) {
    // Compare each list's value and get the smaller one
    if (l1.val <= l2.val) {
      // Add current value of l1 to new list
      list.next = l1;
      // update l1's value with its next value
      l1 = l1.next;
    } else {
      //l2 is the smaller one
      list.next = l2;
      l2 = l2.next;
    }
    // update new list's current value
    list = list.next;
  }

  // A null value has been reached in either list (l1 or l2)
  if (l1 !== null) {
    // join the rest of l1 to new list
    list.next = l1;
  } else {
    list.next = l2;
  }
  // original reference, discarding our initial value (0)
  return head.next;
};

class ListNode {
  constructor(val = null, next = null) {
    this.val = val;
    this.next = next;
  }
}
