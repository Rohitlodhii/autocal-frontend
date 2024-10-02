import { configureStore , createSlice } from "@reduxjs/toolkit";


const penSlice = createSlice({
    initialState : {
        color : '#FF0000',
        width : 3
    },
    name :"pen",
    reducers : {
        changeColor : (state ,action) => {
            state.color = action.payload;
        },
        changeWidth : (state ,action) => {
            state.width =action.payload ;

        }

    }
});

const eraserSlice = createSlice({
    initialState : {
        eraserMode : false ,
        width : 4
    },
    name : "eraser",
    reducers : {
        changeEraserMode : (state ) => {
            state.eraserMode = !state.eraserMode ;
        },
        changeEraserWidth : (state , action) => {
            state.width = action.payload ;
        }

    }
})

const undoRedoSlice = createSlice({
    initialState : {
        redo : 0 ,
        undo : 0 ,
        clear : 0 ,
    },
    name :"undoRedo",
    reducers : {
        changeUndo : (state) => {
            state.undo = state.undo + 1 ;
        },
        changeRedo : (state) => {
            state.redo = state.redo + 1 ;
        },
        clearCanvas : (state) => {
            state.clear = state.clear + 1 ;
        }
    }
})

const canvasSlice = createSlice({
    initialState : {
        bgcolor : '#000000',
       
        dictOfVars : {} ,
    },
    name : "canvas",
    reducers : {
        changeBg : (state , action) => {
            state.bgcolor = action.payload
        },
        
        setDictOfVars : (state , action) => {
            state.dictOfVars = action.payload
        }

    }
})

const userSlice = createSlice({
    name: 'user',
    initialState: {
      user: null,
      isLoggedIn: false,
    },
    reducers: {
      setUser: (state, action) => {
        state.user = action.payload;
        state.isLoggedIn = true;
      },
      clearUser: (state) => {
        state.user = null;
        state.isLoggedIn = false;
      },
    },
})

const resultSlice = createSlice({
    name : "result",
    initialState : {
        result : null ,
    },
    reducers : {
        setResult : (state ,action)=> {
            state.result = action.payload;
        }
    }
})

export const {changeColor ,changeWidth } = penSlice.actions;
export const {changeEraserMode ,changeEraserWidth } = eraserSlice.actions;
export const {changeUndo , changeRedo , clearCanvas} = undoRedoSlice.actions ;
export const {changeBg  , setDictOfVars} = canvasSlice.actions;
export const {setUser , clearUser} = userSlice.actions;
export const {setResult} = resultSlice.actions;



const store = configureStore({
    reducer : {
        pen : penSlice.reducer ,
        eraser : eraserSlice.reducer ,
        undoRedo : undoRedoSlice.reducer ,
        canvas : canvasSlice.reducer ,
        user : userSlice.reducer ,
        result : resultSlice.reducer ,
    },
});

export default store ;
