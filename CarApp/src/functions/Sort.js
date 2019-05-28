class Sort{

   /**
   * @param array - array to sort
   * @param string - name of object property to sort by
   * @param string - 'ASC' / 'DESC'\
   *
   * @return array - new sorted array
   */
   static quickSortObject = (array, property, order = 'ASC') => {

      let sortedArray = array.slice(0);//clone array

      //sort array
      function quickSort(arr, start, end){
         if(start >= end) return;

         const index = partition(arr, start, end);
         quickSort(arr, start, index - 1);
         quickSort(arr, index + 1, end);
      }

      //Reorder values from an array from a to b
      function partition(arr, start, end){
         let pIndex = start;
         let pValue = arr[end][property];

         for(let i = start; i < end; i++){
            const swapDirection = () => {
               const undefinedValue = 'Unknown';
               const a = (arr[i][property] ? arr[i][property].toString().toUpperCase() : undefinedValue);
               const b = (pValue ? pValue.toString().toUpperCase() : undefinedValue);
               switch(order){
                  case 'DESC':
                     return (a > b);
                  case 'ASC':
                  default:
                     return (a < b);
               }
            }
            if(swapDirection()){
               swap(arr, i, pIndex);
               pIndex++;
            }
         }

         swap(arr, pIndex, end);

         return pIndex;
      }

      //Swap two adjacent values inside an array
      function swap(arr, a, b){
         const temp = arr[a];
         arr[a] = arr[b];
         arr[b] = temp;
      }

      quickSort(sortedArray, 0, sortedArray.length - 1);

      return sortedArray;
   }

   /**
   *  @param array - array to sort
   *
   *  @return array - new sorted array
   */
   static randomSort = (array) => {
      const tempArray = array.slice(0);
      const arrayLength = tempArray.length;

      const sortedArray = [];
      for(let i = 0; i < arrayLength; i++){
         const rand = Math.floor(Math.random() * tempArray.length);

         sortedArray.push(tempArray[rand]);
         tempArray.splice(rand, 1);
      }

      return sortedArray;
   }

   /**
   * Must have a sorted array before using, set presort to true if it isn't already sorted
   *
   * @param array - array to sort
   * @param string - name of object property to sort by
   * @param boolean - pre-sort the array before grouping items
   *
   * @param array - new sorted array
   */
   static groupSortObject = (array, property, presort = false) => {
      const list = (presort ? this.quickSortObject(array, property, 'ASC') : array);

      const groupedArray = [];

      let ref = '';
      for(let item of list){
         const target = item[property];

         if(ref !== target){
            ref = target;
            groupedArray.push({
               [property]: target,
               content: [],
            });
         }

         groupedArray[groupedArray.length - 1].content.push(item);
      }

      return groupedArray;
   }
}

export default Sort
