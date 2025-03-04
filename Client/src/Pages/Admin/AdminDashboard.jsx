import React  from 'react';
import Sidebar from '../../Components/Admin/Sidebar';
import UsersList from '../../Components/Admin/UsersList';
const AdminDashboard = () => {

  return (
    <div className='container bg-danger'>
      {/* <button class="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBothOptions" aria-controls="offcanvasWithBothOptions">Admin Panel</button> */}
      <h1 className='p-3'>Admin Dashboard</h1>

      {/* <div class="offcanvas offcanvas-start" data-bs-scroll="true" tabindex="-1" id="offcanvasWithBothOptions" aria-labelledby="offcanvasWithBothOptionsLabel">
        <div class="offcanvas-header">
          <h5 class="offcanvas-title" id="offcanvasWithBothOptionsLabel">Backdrop with scrolling</h5>
          <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body">
          <p>Try scrolling the rest of the page to see this option in action.</p>
        </div>
      </div> */}

      <div className='d-flex'>
        <Sidebar/>
        <UsersList/>
      </div>
    </div>
  );
};

export default AdminDashboard;
