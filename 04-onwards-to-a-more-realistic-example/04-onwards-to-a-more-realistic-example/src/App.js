import React, { useEffect, useState } from "react";

import Tasks from "./components/Tasks/Tasks";
import NewTask from "./components/NewTask/NewTask";
import useHttp from "./hooks/use-http";

// kdyz reloadujeme stranku, tak tam ty ukoly zustanou, jsou uz v databazi.
function App() {
  const [tasks, setTasks] = useState([]);

  const httpData = useHttp();

  const { isLoading, error, sendRequest: fetchTasks } = httpData; // destructuring a pridani alias k send request

  const taskAddHandler = (task) => { //tady si poslu ty data z NewTask a prihodim je do setTasks, a ty tasks pak posilam do Tasks a TaskItem, kde se mi vypisujou.
    setTasks((prevTasks) => prevTasks.concat(task));
  };

  // TADY TY DATA GETUJU Z TE DATABAZE - HODIM ALIAS NA SEND REQUEST JAKO FETCH TASKS.
  useEffect(() => {
    const transformTasks = (tasksObj) => {
      const loadedTasks = [];
      for (const taskKey in tasksObj) {
        loadedTasks.push({ id: taskKey, text: tasksObj[taskKey].text });
      }
      setTasks(loadedTasks);
    };
    fetchTasks(
      { //    v request Configu staci ted url
        url: "https://tasks-custom-hooks-3d663-default-rtdb.firebaseio.com/tasks.json",
      },
      transformTasks // tohle je moje applyData
    );
  }, [fetchTasks]);

  return (
    <React.Fragment>
      <NewTask onAddTask={taskAddHandler} />
      <Tasks
        items={tasks}
        loading={isLoading}
        error={error}
        onFetch={fetchTasks}
      />
    </React.Fragment>
  );
}

export default App;
