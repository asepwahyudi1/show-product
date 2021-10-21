
      var firebaseConfig = {
        apiKey: "AIzaSyDDL0HQSMj0lhPUmuvwtHs3kXasSfVfBe0",
        authDomain: "show-product.firebaseapp.com",
        projectId: "show-product",
        storageBucket: "show-product.appspot.com",
        messagingSenderId: "1097328728197",
        appId: "1:1097328728197:web:e47bb61c78597e986f31ec",
        measurementId: "G-27V5PMSV0R",
      };

  document.getElementById('form').addEventListener("submit",(e)=>{
      var task = document.getElementById("task").value;
      var description = document.getElementById("description").value;
      e.preventDefault();
      createTask(task,description);
      FormData.reset();
  });

  function createTask(taskName,description){

    var task={

        task: taskName,
        description:description
    }
    let db= firebase.firestore().collection("tasks/")
    db.add(task).then(()=>{
        Swal.fire(
            'Good job!',
            'Task Added!',
            'success'
        )
        document.getElementById("cardSection").innerHTML='';
        readTask();
    })
  }

  function readTask(){

    firebase.firestore().collection("tasks").onSnapshot(function(snapshot) {
    document.getElementById("cardSection").innerHTML='';
    snapshot.forEach(function(taskValue) {

        document.getElementById("cardSection").innerHTML+=`
        <div class="card mb-3">
            <div class="card-body">
                <h5 class="card-title">${taskValue.data().task}</h5>
                <p class="card-text">${taskValue.data().description}</p>
                <button type="submit" style="color:white" class="btn btn-warning" onclick="updateTask('${taskValue.id}','${taskValue.data().task}','${taskValue.data().description}')"><i class="fas fa-edit"></i> Edit Task</button>
                <button type="submit" class="btn btn-danger" onclick="deleteTask('${taskValue.id}')"><i class="fas fa-trash-alt"></i>Delete Task</button>
            </div>
        </div>
        `
    });
});
}

function reset() {
    document.getElementById("firstSection").innerHTML=`    <form class="border p-4 mb-4 " id="form">
    </from>
    <div class="form-group">
        <label>Task</label>
        <input type="text" class="form-control" id="task" placeholder="Enter task">
    <div>

    <div class="from-group">
        <label>Description</label>
        <input type="text" class="form-control" id="description" placeholder="Description">
    </div>

    <button type="submit" id="button1" class="btn btn-primary"><i class="fas fa-plus"></i>ADD TASK</button>
    <button style="display: none;" id="button2" class="btn btn-success">Update Task</button>
    <button style="display: none;" id="button3" class="btn btn-danger">Cancel</button>
    </from>
    `;

    document.getElementById('form').addEventListener("submit",(e)=>{
        var task = document.getElementById("task").value;
        var description = document.getElementById("description").value;
        e.preventDefault();
        createTask(task,description);
        form.reset();
    });
}

function updateTask(id, name, description) {
    document.getElementById("firstSection").innerHTML = `
      <form action="" id="form2" class="border p-4 mb-4">
        <div class="form-group">
          <label for="">Task</label>
          <input
            type="text"
            placeholder="Enter Task"
            class="form-control"
            id="task"
          />
        </div>

        <div class="form-group">
          <label for="">Deskripsi</label>
          <input
            type="text"
            placeholder="deskripsi"
            class="form-control"
            id="description"
          />
        </div>

        <button style="display:none" class="btn btn-primary" id="button1">
          <i class="fas fa-plus">Tambahkan Task</i>
        </button>
        <button id="button2" type="submit" class="btn btn-success" style="display: inline-block"><i class="fas fa-sync"></i>
          Update Task
        </button>
        <button id="button3" class="btn btn-danger" style="display: inline-block"><i class="fas fa-ban"></i>
          Batal
        </button>
      </form>`;

    document.getElementById("form2"),
      addEventListener("submit", (e) => {
        e.preventDefault();
      });
    document.getElementById("button3"),
      addEventListener("click", (e) => {
        reset();
      });
    document.getElementById("button2"),
      addEventListener("click", (e) => {
        updateTask2(
          id,
          document.getElementById("task").value,
          document.getElementById("description").value
        );
      });
    document.getElementById("task").value = name;
    document.getElementById("description").value = description;
  }


  function updateTask2(id,name,description) {
    db.set(taskUpdate).then(()=>{
      Swal.fire(
        'Good job',
        'Task Update',
        'success'
      )
    })

    document.getElementById("cardSection").innerHTML='';
    readTask();
    reset();
  }

  function deleteTask(id){
    firebase.firestore().collection("tasks").doc(id).delete().then(()=>{
      Swal.fire(
        'Good job',
        'Task Removed!',
        'success'
      ) 
    })
    reset();
    document.getElementById("cardSection").innerHTML='';
    readTask();
  }