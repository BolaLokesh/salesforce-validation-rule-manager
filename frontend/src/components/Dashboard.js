import React, { useEffect, useState } from 'react';
import api from '../api';

function Dashboard() {

  const [rules, setRules] = useState([]);

  const fetchRules = async () => {

    try {

      const response = await api.get('/validation-rules');

      setRules(response.data);

    } catch (error) {

      console.log(error);
    }
  };
  useEffect(() => {
    fetchRules();
  }, []);

  const toggleRule = async (rule) => {

    try {

      await api.post('/toggle-rule', {
        id: rule.Id,
        active: rule.Active
      });

      fetchRules();

    }  catch (error) {

      console.log(error);
    }
  };

  return (

    <div className='container'>

      <h1 className='heading'>Validation Rules Dashboard</h1>

      <table className='table'>

        <thead>
            <tr>
            <th>Validation Rule</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>

          {rules.map(rule => (

            <tr key={rule.Id}>

              <td>{rule.ValidationName}</td>

              <td>
                <span className={rule.Active ? 'active' : 'inactive'}>
                  {rule.Active ? 'Active' : 'Inactive'}
                </span>
              </td>

              <td>
                <button
                  className='toggle-btn'
                  onClick={() => toggleRule(rule)}
                >Toggle</button></td>

            </tr>
          ))}

        </tbody>

      </table>

    </div>
  );
}
export default Dashboard;