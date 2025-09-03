'use strict';

// eslint-disable-next-line import/no-unresolved
import { parseSalary } from './helpers/parseSalary.js';

/**
 * Sort a list of employees by salary
 * and reorder existing DOM nodes
 *
 * @param {Element} listContainer - <ul>
 */
function sortList(listContainer) {
  // Convert HTMLCollection to array
  const listItems = Array.from(listContainer.children);

  // Ensure all dataset attributes exist
  listItems.forEach((el) => {
    el.dataset.salary = el.dataset.salary || '0';
    el.dataset.position = el.dataset.position || '';
    el.dataset.age = el.dataset.age || '0';
  });

  // Sort by salary descending
  listItems.sort(
    (a, b) => parseSalary(b.dataset.salary) - parseSalary(a.dataset.salary),
  );

  // Reattach elements to preserve DOM nodes
  listItems.forEach((el) => listContainer.appendChild(el));
}

/**
 * Extract array of employee objects
 *
 * @param {Element} listContainer - <ul>
 * @returns {Array<Object>} - Employee objects
 */
function getEmployees(listContainer) {
  return Array.from(listContainer.querySelectorAll(':scope > li')).map(
    (el) => ({
      name: el.textContent ? el.textContent.trim() : '',
      position: el.dataset.position || undefined,
      salary: parseSalary(el.dataset.salary),
      age: !isNaN(el.dataset.age) ? Number(el.dataset.age) : 0,
    }),
  );
}

// Select the list container
const targetElement = document.querySelector('ul');

// Sort the list
sortList(targetElement);

// eslint-disable-next-line no-unused-vars
const employees = getEmployees(targetElement);
