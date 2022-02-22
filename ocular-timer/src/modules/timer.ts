const CREATE = 'timer/CREATE' as const;
const LOAD = 'timer/LOAD' as const;
const DELETE = 'timer/DELETE' as const;
const EDIT = 'timer/EDIT' as const;

export const addTimer = (data: TimerData) => ({
  type: CREATE,
  data
});

export const load = () => ({
  type: LOAD
});

export const deleteTimer = (data: number) => ({
  type: DELETE,
  data
});

export const editTimer = (data: TimerData) => ({
  type: EDIT,
  data
})

type TimerAction = | ReturnType<typeof addTimer> | ReturnType<typeof load> | ReturnType<typeof deleteTimer> | ReturnType<typeof editTimer>;


type TimerData = {
  id: number;
  title: string;
  time: number;
  timesplit: number[];
  color: string;
}

const initialState: TimerData[] = [
  {
    id: 0,
    title: "뽀모도로 🍅",
    time: 1500,
    timesplit:[0,25,0],
    color: "#22577E"
  },
  {
    id: 1,
    title: "라면 🍜",
    time: 180,
    timesplit:[0,3,0],
    color: "#6998AB"
  },
  {
    id: 2,
    title: "RC 📝",
    time: 4500,
    timesplit:[1,15,0],
    color: "#406882"
  }
];

const timer = (state: TimerData[] = initialState, action: TimerAction): TimerData[] => {
  switch (action.type) {
    case CREATE: 
      return [...state, action.data];
    case DELETE:
      return state.filter((timer) => timer.id !== action.data);
    case EDIT:
      state.forEach((timer,idx)=>{
        if(timer.id === action.data.id){
          state[idx] = action.data;
        }
      });
      return state;
    default:
      return state;
  }
}

export default timer;