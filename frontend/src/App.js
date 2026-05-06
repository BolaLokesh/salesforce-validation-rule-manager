import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {

  const [rules, setRules] = useState([]);

  const login = () => {
    window.location.href = "https://salesforce-validation-rule-manager-kjms.onrender.com/api/login";
  };

  const fetchRules = async () => {

    try {

      const res = await axios.get(
        "https://salesforce-validation-rule-manager-kjms.onrender.com/api/validation-rules"
      );

      setRules(res.data);

    } catch (err) {

      console.log(err);

      alert("Error fetching validation rules");
    }
  };

  const toggleRule = async (id, currentStatus) => {

    try {

      await axios.post(
        "https://salesforce-validation-rule-manager-kjms.onrender.com/api/toggle-rule",
        {
          fullName: id,
          active: !currentStatus
        }
      );

      fetchRules();

    } catch (err) {

      console.log(err);

      alert("Error updating validation rule");
    }
  };

  return (

    <div className="container">

      <h1>Salesforce Validation Rule Manager</h1>

      <button onClick={login}>
        Login with Salesforce
      </button>

      <button onClick={fetchRules}>
        Get Validation Rules
      </button>

      <table>

        <thead>
          <tr>
            <th>Validation Rule</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>

          {rules.map((rule) => (

            <tr key={rule.Id}>

              <td>{rule.ValidationName}</td>

              <td>
                {rule.Active ? "Active" : "Inactive"}
              </td>

              <td>

                <button
                  onClick={() =>
                    toggleRule(
  `${rule.EntityDefinition.QualifiedApiName}.${rule.ValidationName}`,
  rule.Active
)
                  }
                >

                  {rule.Active ? "Disable" : "Enable"}

                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}

export default App;