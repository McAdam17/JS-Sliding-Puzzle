const board = document.getElementById('board');
const range = document.getElementById('range');
const visual_help = document.getElementById('visual_help');
let absBoard = [];

visual_help.innerText = range.value;

range.addEventListener('input',()=>{
    visual_help.innerText = range.value;
    const long = Number(range.value);
    generateBoard(long);
})


function generateBoard(long = 3){
    absBoard = [];
    board.style.gridTemplateColumns = `repeat(${long},1fr)`;
    board.innerHTML = '';
    
    let count = 1;
    let areas = '';
    for(let i=0;i<long;i++){
        const row = [];
        let area='';
        for(let j=0;j<long;j++){    
            const element = document.createElement('div');
            element.classList.add('sliding-pluzze__piece');
            const classN = i===long-1 && j===long-1 ? 'empty' : `piece_${count}`
            element.classList.add(classN);
            if(classN!=='empty'){
                element.innerText = `${count}`;
            }
            element.addEventListener('click',movePiece)
            board.appendChild(element);
            element.style.gridArea = classN;

            area+=` ${classN} `;

            count++;
            row.push(classN);
        }
        area = `"${area.trim()}"`;
        areas+= area+' ';
        absBoard.push(row);
    }
    areas = areas.trim();
    board.style.gridTemplateAreas = areas;
}

function movePiece(e){
    let currentPiece = e.target;
    const classN = currentPiece.classList[1];
    if(classN==='empty'){
        return 
    }
    let empty = {
        i: 0,
        j: 0
    };
    let piece = {
        i: 0,
        j: 0
    };
    for(let i=0;i<absBoard.length;i++){
        for(let j=0;j<absBoard[i].length;j++){
            if(absBoard[i][j]===classN){
                piece.i = i;
                piece.j = j;
            }
            if(absBoard[i][j]==='empty'){
                empty.i = i;
                empty.j = j;
            }
        }
    }

    const validations = [];
    const sup = empty.i-1;
    const inf = empty.i+1;
    const left = empty.j-1;
    const right = empty.j+1;
    if(sup>=0){
        validations.push(absBoard[sup][empty.j]);
    }
    if(inf<absBoard.length){
        validations.push(absBoard[inf][empty.j]);
    }
    if(left>=0){
        validations.push(absBoard[empty.i][left]);
    }
    if(right<absBoard[0].length){
        validations.push(absBoard[empty.i][right]);
    }

    const pieceValue = absBoard[piece.i][piece.j];
    if(!validations.includes(pieceValue)){
        return
    }

    const aux = absBoard[piece.i][piece.j];
    absBoard[piece.i][piece.j] = 'empty';
    absBoard[empty.i][empty.j] = aux;

    let areas = '';
    for(let i=0;i<absBoard.length;i++){
        let area='';
        for(let j=0;j<absBoard[0].length;j++){
            area+=` ${absBoard[i][j]} `;
        }
        area = `"${area.trim()}"`;
        areas+= area+' ';
    }
    areas = areas.trim();
    board.style.gridTemplateAreas = areas;
}

generateBoard(3);