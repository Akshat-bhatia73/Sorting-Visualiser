import swap from "./Swap";

export const getSelectionSortAnimations = (array, arraySize) => {
    const animations = [];
    selectionSort(array, arraySize, animations)
    return animations
}

function selectionSort(arr,  arraySize, animations)
{
    var i, j, min_idx;
    for (i = 0; i < arraySize-1; i++)
    {
        min_idx = i;
        for (j = i + 1; j < arraySize; j++){
            if (arr[j] < arr[min_idx])
                min_idx = j;
        }
        animations.push([i, min_idx])
        swap(arr,min_idx, i);
        animations.push([min_idx, arr[min_idx], i, arr[i]])
        animations.push([i, min_idx])
    }
}
 