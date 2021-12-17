import useHttp from "../../hooks/use-http";
import Section from "../UI/Section";
import TaskForm from "./TaskForm";
// data z new tasku se pak maji vypisovat v tasks, resp. task item.
// ZDE CHCI DATA ODESILAT, TEDY POSTOVAT. Z TASK FORM SI SEM POSLU TEN NOVY UKOL.
const NewTask = (props) => {
  const { isLoading, error, sendRequest: sendTaskRequest } = useHttp();

  const createTask = (taskText, taskData) => {
    const generatedId = taskData.name; // firebase-specific => "name" contains generated id
    const createdTask = { id: generatedId, text: taskText };

    props.onAddTask(createdTask); // ten ukol si posilam do Appu.
  };

  // TOHLE MI ZPRACOVAVA TY DATA Z TASK FORM. 
  const enterTaskHandler = async (taskText) => {
    sendTaskRequest( // na ty data z task form budeme aplikovat sendTaskRequest, coz je moje fetch v useHttp.
      { // tohle je ten requestConfig
        url: "https://tasks-custom-hooks-3d663-default-rtdb.firebaseio.com/tasks.json",
        method: "POST",
        body: taskText,
      },
      createTask.bind(null, taskText) // jak ziskam ta data v useHttp, pouziuju na ne applyData, ktere mam zde navrzene jako createTask
    );
  };

  return (
    <Section>
      <TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
      {error && <p>{error}</p>}
    </Section>
  );
};

export default NewTask;
