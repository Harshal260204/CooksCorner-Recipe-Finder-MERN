import React from 'react';

const UsersList = () => {
  return (
    <div className='container mt-4'>
      <h2 className='text-center text-primary mb-4'>Users List</h2>
      <div className='table-responsive'>
        <table className='table table-striped table-bordered table-hover'>
          <thead className='thead-dark'>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Number</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>John Doe</td>
              <td>john@example.com</td>
              <td>1234567890</td>
              <td>
                <button className='btn btn-danger btn-sm'>Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersList;
