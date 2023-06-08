const elements = document.querySelectorAll(".draggable-item"); // Select all draggable elements
const itemContainers = document.querySelectorAll(".containerBox"); // Select all container elements
const resetButton = document.querySelector(".reset");
const containerOne = document.querySelector("#containerOne");
const containerTwo = document.querySelector("#containerTwo");

// Add event listeners to each draggable item
elements.forEach((item) => {
  item.addEventListener("dragstart", () => {
    item.classList.add("dragging"); // Add a "dragging" class when dragging starts
  });

  item.addEventListener("dragend", () => {
    item.classList.remove("dragging"); // Remove the "dragging" class when dragging ends
  });
});

// Add event listeners to each container element
itemContainers.forEach((itemContainer) => {
  itemContainer.addEventListener("dragover", (e) => {
    e.preventDefault(); // Prevent the default dragover behavior

    const afterElement = getDragAfterElement(itemContainer, e.clientY); // Get the element after which the dragged item should be placed
    const item = document.querySelector(".dragging"); // Get the currently dragged item

    if (afterElement == null) {
      itemContainer.appendChild(item); // If there's no element after which to insert, append the dragged item to the container
    } else {
      itemContainer.insertBefore(item, afterElement); // Insert the dragged item before the identified element
    }
  });
});

// Function to determine the element after which the dragged item should be placed
function getDragAfterElement(itemContainer, y) {
  const itemElements = [
    ...itemContainer.querySelectorAll(".item:not(.dragging)"), // Select all items within the container, excluding the currently dragged item
  ];

  return itemElements.reduce(
    (closest, child) => {
      const box = child.getBoundingClientRect(); // Get the bounding rectangle of each item
      const offset = y - box.top - box.height / 2; // Calculate the offset between the mouse position and the center of the item

      if (offset < 0 && offset > closest.offset) {
        // If the offset is negative (mouse is above the center) and greater than the previous closest offset
        return { offset: offset, element: child }; // Set the current item as the new closest element
      } else {
        return closest; // Otherwise, keep the previous closest element
      }
    },
    { offset: Number.NEGATIVE_INFINITY } // Initialize the closest element with a large negative offset
  ).element;
}

resetButton.addEventListener("click", (e) => {
  e.preventDefault();
  console.log("Reset button was clicked");
  // Move all draggable items from container one to container two
  elements.forEach((item) => containerOne.appendChild(item));

  // Clear container one by removing its children
  while (containerTwo.firstChild) {
    containerOne.removeChild(containerTwo.firstChild);
  }
});
