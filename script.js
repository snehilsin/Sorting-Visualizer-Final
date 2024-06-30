
const n=15;
const array=[];
init();

let audioctx=null;
function playnote(freq){
    if(audioctx==null){
          audioctx = new (AudioContext || webkitAudioContext || window.webkitAudioContext)();
    }
        const dur=0.1;
        const osc=audioctx.createOscillator();
        osc.frequency.value=freq;
        osc.start();
        osc.stop(audioctx.currentTime+dur);
        const node=audioctx.createGain();
        node.gain.value=0.1;
        node.gain.linearRampToValueAtTime(
            0,audioctx.currentTime+dur
        );
        osc.connect(node);
        node.connect(audioctx.destination);
}

function init(){
for(let i=0;i<n;i++){
    array[i]=Math.random();
}
showbars();
definition.innerHTML="";
}

function play(){
    const copy=[...array]
   const moves= bubblesort(copy);
   animate(moves)
    showbars();
    definebubble()
}
function selectplay(){
    const copy=[...array]
   const moves= selectionsort(copy);
   animate(moves)
    showbars();
    defineselect();
}
function insertplay(){
    const copy=[...array]
   const moves= insertionsort(copy);
   animate(moves)
    showbars();
    defineinsert();
}


function animate(moves){
     // Base case: If there are no more moves to perform, stop the animation.
    if(moves.length===0){
        showbars()
        return
       
    }
    // array shift method return first value of an array
     // Extract the first pair of indices to swap from the 'moves' array.
    //  The shift() method removes the first item of an array.
    const move=moves.shift();
    const [i,j]=move.indices;
    if(move.type=="swap"){
    [array[i],array[j]]=[array[j],array[i]]
    }
    playnote(200+array[i]*500);
    playnote(200+array[j]*500);
    showbars(move)
    setTimeout(function(){
        animate(moves)
    },80)
}
function bubblesort(array){
    const moves=[];
    for(let i=0;i<array.length-1;i++){
        let swapped=0;
        for(let j=0;j<array.length-i-1;j++){
            
            moves.push({indices:[j,j+1],type:"comp"})
            if(array[j]>array[j+1]){
                swapped=1
                let temp=array[j];
                array[j]=array[j+1];
                array[j+1]=temp;
                moves.push({indices:[j,j+1],type:"swap"})

            }
        }
        if(swapped==0){
            break;
        }

       
    }
    return moves;
}

function selectionsort(array){
    const moves=[];
    for(let i=0;i<array.length-1;i++){
        let min=i;

        for(let j=i+1;j<array.length;j++){
            moves.push({indices:[j,min],type:"comp"})
            if(array[j]<array[min]){
                min=j;
            }
        }
        if (min != i) {
            let temp=array[i];
            array[i]=array[min];
            array[min]=temp;
         
            moves.push({indices:[min,i],type:"swap"})
       }
       
    }
    return moves;

}
function insertionsort(array){
    const moves=[];
    for(let i=1;i<array.length;i++){
        for(let j=i;j>0;j--){
            moves.push({indices:[j,j-1],type:"comp"})
            if(array[j]<array[j-1]){
                let temp=array[j];
                array[j]=array[j-1];
                array[j-1]=temp;
                moves.push({indices:[j,j-1],type:"swap"})
            }
            else{
                break;
            }
        }
    }
    return moves;
}

//  definitions
function defineselect(){
    definition.innerHTML="";
    definition.innerHTML=" <h2>Definition </h2>";
    definition.innerHTML+="<p> The Selection sort algorithm is based on the idea of finding the minimum or maximum element in an unsorted array and then putting it in its correct position in a sorted array.</p>";
    definition.innerHTML+=" <p>The smallest value among the unsorte elements of the array is selected in every iteration and placed in appropriate position .</p>";
    definition.innerHTML+="<img src=\"selection.png\">";
    definition.innerHTML+=" <h2>Time complexity</h2>";
    definition.innerHTML+="<img src=\"time-complexity.jpg\" >";

}
function definebubble(){
    definition.innerHTML="";
    definition.innerHTML=" <h2>Definition </h2>";
    definition.innerHTML+=" <p>Bubble sort is based on the idea of repeatedly comparing pairs of adjacent elements and then swapping their positions if they exist in the wrong order.</p>";
    definition.innerHTML+="<img src=\"bubble.png\">";
    definition.innerHTML+=" <h2>Time complexity</h2>";
    definition.innerHTML+="<img src=\"time-complexity.jpg\" >";
}
function defineinsert(){
    definition.innerHTML="";
    definition.innerHTML=" <h2>Definition </h2>";
    definition.innerHTML+="  <p>Similar to the way of you sort playing cards in hand. The array is viratually split into a sorted and an unsorted parts. Values from the unsorted part are picked and placed at the correct position in sort part.</p>";
    definition.innerHTML+="<img src=\"insert.png\">";
    definition.innerHTML+=" <h2>Time complexity</h2>";
    definition.innerHTML+="<img src=\"time-complexity.jpg\" >";
}

function showbars(move){
    container.innerHTML="";
   for(let i=0;i<n;i++){
    
    const bar=document.createElement("div");
    bar.style.height=array[i]*100+"%";
    bar.classList.add("bar");
    // If the indices array is provided (not null or undefined), 
    // the function checks if the current index (i) is included in the indices array using indices.includes(i).
    //  If the index is present in the indices array, the function gives the corresponding bar a red 
    if(move && move.indices.includes(i)){
        bar.style.backgroundColor= move.type=="swap"?"red":"blue";
    }
    container.appendChild(bar);

    
    }
}