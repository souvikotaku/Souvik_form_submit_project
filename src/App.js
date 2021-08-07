import "./App.css";
import { Form, Input, Button, notification } from "antd";
import "antd/dist/antd.css";
import "./newStyle2.css";
import "./tablestyle.css";
import firebase from "./util/firebase";
import { useState, useEffect, useRef } from "react";
import { SortAscendingOutlined } from "@ant-design/icons";

function App() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [newFormdatas, setformdatas] = useState([]);
  const [form] = Form.useForm();

  const inputOne = useRef();
  const tableOne = useRef();

  useEffect(() => {
    const formRef = firebase.database().ref("formReact");

    formRef.on("value", (snapshot) => {
      // console.log(snapshot.val());

      const formdatas = snapshot.val();
      const todoList = [];

      for (let id in formdatas) {
        todoList.push({ id, ...formdatas[id] });
      }

      console.log(todoList);

      setformdatas(todoList);
    });
  }, []);

  const onFinish = (values) => {
    console.log("Success:", values);
    const formRef = firebase.database().ref("formReact");

    const formdata = {
      firstName,
      lastName,
      email,
    };

    formRef.push(formdata);

    form.resetFields();

    const type = "success";

    const openNotificationWithIcon = () => {
      notification[type]({
        message: "Form Submitted",
        description: "Hurray! your form has been submitted!!",
      });
    };

    openNotificationWithIcon();
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const validateMessages = {
    required: "Please enter your email!",
    types: {
      email: "This is not a valid email",
    },
  };

  function myFunction() {
    var input, filter, table, tr, td, i, txtValue;
    // input = document.getElementById("myInput");
    input = inputOne.current;
    filter = input.value.toUpperCase();
    // table = document.getElementById("myTable");
    table = tableOne.current;
    tr = table.getElementsByTagName("tr");

    // console.log(inputOne.current);

    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[1];
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }
    }
  }

  function sortTable(n) {
    var table,
      rows,
      switching,
      i,
      x,
      y,
      shouldSwitch,
      dir,
      switchcount = 0;
    table = tableOne.current;
    switching = true;
    // Set the sorting direction to ascending:
    dir = "asc";
    /* Make a loop that will continue until
    no switching has been done: */
    while (switching) {
      // Start by saying: no switching is done:
      switching = false;
      rows = table.rows;
      /* Loop through all table rows (except the
      first, which contains table headers): */
      for (i = 1; i < rows.length - 1; i++) {
        // Start by saying there should be no switching:
        shouldSwitch = false;
        /* Get the two elements you want to compare,
        one from current row and one from the next: */
        x = rows[i].getElementsByTagName("TD")[n];
        y = rows[i + 1].getElementsByTagName("TD")[n];
        /* Check if the two rows should switch place,
        based on the direction, asc or desc: */
        if (dir == "asc") {
          if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
            // If so, mark as a switch and break the loop:
            shouldSwitch = true;
            break;
          }
        } else if (dir == "desc") {
          if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
            // If so, mark as a switch and break the loop:
            shouldSwitch = true;
            break;
          }
        }
      }
      if (shouldSwitch) {
        /* If a switch has been marked, make the switch
        and mark that a switch has been done: */
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
        // Each time a switch is done, increase this count by 1:
        switchcount++;
      } else {
        /* If no switching has been done AND the direction is "asc",
        set the direction to "desc" and run the while loop again. */
        if (switchcount == 0 && dir == "asc") {
          dir = "desc";
          switching = true;
        }
      }
    }
  }

  return (
    <div
      className="App"
      style={{
        background: "#2C3E50" /* fallback for old browsers */,
        background:
          "-webkit-linear-gradient(to right, #4CA1AF, #2C3E50)" /* Chrome 10-25, Safari 5.1-6 */,
        background:
          "linear-gradient(to right, #4CA1AF, #2C3E50)" /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */,
        zIndex: 1,
        paddingBottom: "2rem",
      }}
    >
      <div
        className="register "
        class="registerback"
        style={{ marginTop: "-4rem" }}
      >
        <div
          className="register_container shadow"
          class="colorbox"
          // style={{ display: "flex", justifyContent: "center" }}
        >
          <div>
            <h2>Form</h2>
          </div>
          <Form
            form={form}
            name="basic"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            validateMessages={validateMessages}
          >
            <Form.Item
              // label="Username"
              name="firstname"
              rules={[
                {
                  required: true,
                  message: "Please enter your first name!",
                },
              ]}
            >
              <Input
                placeholder="Enter first name"
                onChange={(event) => {
                  setFirstName(event.target.value);
                }}
              />
            </Form.Item>
            <Form.Item
              // label="Username"
              name="lastname"
              rules={[
                {
                  required: true,
                  message: "Please enter your last name!",
                },
              ]}
            >
              <Input
                placeholder="Enter last name"
                onChange={(event) => {
                  setLastName(event.target.value);
                }}
              />
            </Form.Item>
            <Form.Item
              // label="Username"
              name="email"
              rules={[
                {
                  required: true,
                  // message: "Please enter your email!",
                  type: "email",
                },
              ]}
            >
              <Input
                placeholder="Enter email"
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
              />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{ width: "100%" }}
              >
                Submit
              </Button>
            </Form.Item>
          </Form>
          <p>Made by souvik das</p>
        </div>
      </div>

      {/* bootstrap table */}
      <div className="container">
        <input
          type="text"
          id="myInput"
          onKeyUp={myFunction}
          placeholder="Search for names.."
          title="Type in a name"
          ref={inputOne}
        />

        <div
          style={{
            width: "100%",
            height: "260px",
            overflow: "scroll",
            background: "#fff",
          }}
        >
          <table id="myTable" ref={tableOne}>
            <tbody>
              <tr className="header">
                {/* <th style={{ width: "10%" }}>Sr No.</th> */}
                <th style={{ width: "15%" }}>
                  Sr No.
                  <SortAscendingOutlined onClick={() => sortTable(0)} />
                </th>
                <th style={{ width: "32%" }}>
                  First Name
                  <SortAscendingOutlined onClick={() => sortTable(1)} />
                </th>
                <th style={{ width: "28%" }}>
                  Last Name
                  <SortAscendingOutlined onClick={() => sortTable(2)} />
                </th>
                <th style={{ width: "33%" }}>Email</th>
              </tr>
              {newFormdatas.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.firstName}</td>
                    <td>{item.lastName}</td>
                    <td>{item.email}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;
