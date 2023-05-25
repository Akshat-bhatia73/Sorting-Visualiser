import swap from "../helper/Swap";

export const getHeapSortAnimations =(array, arraySize) => {
    const animations = [];
    heapSort(array, arraySize, animations)
    return animations
}

const heapify = (array, n, i, animations) => {
  let largest = i; 
  let l = 2 * i + 1; 
  let r = 2 * i + 2;
  
  if (l < n && array[l] > array[largest]) largest = l;
  
  if (r < n && array[r] > array[largest]) largest = r;
  
  if (largest !== i) {
    animations.push([largest, i])
    swap(array, largest, i)
    animations.push([largest, array[largest], i, array[i]])
    animations.push([largest, i])
    
    heapify(array, n, largest, animations);
  }
};

const buildHeap = (array, n, animations) => {
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(array, n, i, animations);
  }
};

const heapSort = (array, arraySize, animations) => {
  const n = arraySize;
  buildHeap(array, n, animations);
  for (let i = n - 1; i > 0; i--) {
    animations.push([0, i])
    swap(array, 0, i);
    animations.push([0, array[0], i, array[i]])
    animations.push([0, i])

    heapify(array, i, 0, animations);
  }
};

