import swap from "../helper/Swap";

export const getSelectionSortAnimations = (array, arraySize) => {
    const animations = [];
    selectionSort(array, arraySize, animations)
    return animations
}

function selectionSort(arr,  arraySize, animations)
{
    let i, j, minIdx;
    for (i = 0; i < arraySize-1; i++)
    {
        minIdx = i;
        for (j = i + 1; j < arraySize; j++){
            if (arr[j] < arr[minIdx])
                minIdx = j;
        }
        //Pushing the indices into animation to change the color
        animations.push([i, minIdx])
        swap(arr,minIdx, i);
        animations.push([minIdx, arr[minIdx], i, arr[i]])
        //Againg pushing the indices to revert backto original color
        animations.push([i, minIdx])
    }
}
 