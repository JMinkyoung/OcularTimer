const CREATE = 'timer/CREATE' as const;
const LOAD = 'timer/LOAD' as const;
const DELETE = 'timer/DELETE' as const;

export const create = () => ({
  type: CREATE
});

export const load = () => ({
  type: LOAD
});

export const deleteTimer = () => ({
  type: DELETE,
});

type TimerAction = | ReturnType<typeof create> | ReturnType<typeof load> | ReturnType<typeof deleteTimer>;

type TimerData = {
  id: number;
  title: string;
  time: number;
  color: string;
}
// type TimerState = {
//   TimerDatas: TimerData[];
// };

const initialState: TimerData[] = [
  {
    id: 1,
    title: "뽀모도로",
    time: 360,
    color: "#22577E"
  }
];

const timer = (state: TimerData[] = initialState, action: TimerAction): TimerData[] => {
  switch (action.type) {
    case CREATE: 
      return { 
        ...state,
      };
    // case LOAD:
    //   return { count: state.count - 1 };
    // case DELETE:
    //   return { count: state.count + action.payload };
    default:
      return state;
  }
}

export default timer;