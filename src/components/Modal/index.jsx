import { MODAL_TYPES } from "@/constants/general";
import { useAuthContext } from "@/context/AuthContext";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import { useDispatch, useSelector } from "react-redux";
import {
  handleCloseModal,
  handleStatusModal,
} from "@/store/reducers/authReducer";

const AuthModal = () => {
  const { statusModal } = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();

  const _handleAuth = (e, tab) => {
    e?.preventDefault();
    dispatch(handleStatusModal(tab));
  };

  return (
    <>
      <div
        className={`modal  ${!!statusModal ? "fade show" : ""}`}
        style={{ display: `${!!statusModal ? "block" : "none"}` }}
        id="signin-modal"
        tabIndex={-1}
        role="dialog"
        // aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-body">
              <button
                type="button"
                className="close"
                // data-dismiss="modal"
                // aria-label="Close"
                onClick={() => dispatch(handleCloseModal())}
              >
                <span aria-hidden="true">
                  <i className="icon-close" />
                </span>
              </button>
              <div className="form-box">
                <div className="form-tab">
                  <ul
                    className="nav nav-pills nav-fill nav-border-anim"
                    role="tablist"
                  >
                    <li className="nav-item">
                      <a
                        onClick={(e) => _handleAuth(e, MODAL_TYPES.login)}
                        className={`nav-link ${
                          statusModal === MODAL_TYPES.login ? "active" : ""
                        }`}
                        // id="signin-tab"
                        // data-toggle="tab"
                        href="#signin"
                        // role="tab"
                        // aria-controls="signin"
                        // aria-selected="true"
                      >
                        Sign In
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        onClick={(e) => _handleAuth(e, MODAL_TYPES.register)}
                        className={`nav-link ${
                          statusModal === MODAL_TYPES.register ? "active" : ""
                        }`}
                        // id="register-tab"
                        // data-toggle="tab"
                        href="#register"
                        // role="tab"
                        // aria-controls="register"
                        // aria-selected="false"
                      >
                        Register
                      </a>
                    </li>
                  </ul>
                  <div className="tab-content" id="tab-content-5">
                    <div
                      className="tab-pane fade show active"
                      // id="register"
                      // role="tabpanel"
                      // aria-labelledby="register-tab"
                    >
                      {statusModal === MODAL_TYPES.login && <LoginForm />}
                      {statusModal === MODAL_TYPES.register && <RegisterForm />}
                      <div className="form-choice">
                        <p className="text-center">or sign in with</p>
                        <div className="row">
                          <div className="col-sm-6">
                            <a href="#" className="btn btn-login btn-g">
                              <i className="icon-google" />
                              Login With Google
                            </a>
                          </div>
                          {/* End .col-6 */}
                          <div className="col-sm-6">
                            <a href="#" className="btn btn-login  btn-f">
                              <i className="icon-facebook-f" />
                              Login With Facebook
                            </a>
                          </div>
                          {/* End .col-6 */}
                        </div>
                        {/* End .row */}
                      </div>
                      {/* End .form-choice */}
                    </div>
                    {/* .End .tab-pane */}
                  </div>
                  {/* End .tab-content */}
                </div>
                {/* End .form-tab */}
              </div>
              {/* End .form-box */}
            </div>
            {/* End .modal-body */}
          </div>
          {/* End .modal-content */}
        </div>
        {/* End .modal-dialog */}
      </div>
      {!!statusModal && (
        <div
          className="modal-backdrop fade show"
          onClick={() => dispatch(handleCloseModal())}
        />
      )}
    </>

    // <div
    //   className="modal fade"
    //   id="signin-modal"
    //   tabIndex={-1}
    //   role="dialog"
    //   aria-hidden="true"
    // >
    //   <div className="modal-dialog modal-dialog-centered" role="document">
    //     <div className="modal-content">
    //       <div className="modal-body">
    //         <button
    //           type="button"
    //           className="close"
    //           data-dismiss="modal"
    //           aria-label="Close"
    //         >
    //           <span aria-hidden="true">
    //             <i className="icon-close" />
    //           </span>
    //         </button>
    //         <div className="form-box">
    //           <div className="form-tab">
    //             <ul
    //               className="nav nav-pills nav-fill nav-border-anim"
    //               role="tablist"
    //             >
    //               <li className="nav-item">
    //                 <a
    //                   className="nav-link active"
    //                   id="signin-tab"
    //                   data-toggle="tab"
    //                   href="#signin"
    //                   role="tab"
    //                   aria-controls="signin"
    //                   aria-selected="true"
    //                 >
    //                   Sign In
    //                 </a>
    //               </li>
    //               <li className="nav-item">
    //                 <a
    //                   className="nav-link"
    //                   id="register-tab"
    //                   data-toggle="tab"
    //                   href="#register"
    //                   role="tab"
    //                   aria-controls="register"
    //                   aria-selected="false"
    //                 >
    //                   Register
    //                 </a>
    //               </li>
    //             </ul>
    //             <div className="tab-content" id="tab-content-5">
    //               <div
    //                 className="tab-pane fade show active"
    //                 id="signin"
    //                 role="tabpanel"
    //                 aria-labelledby="signin-tab"
    //               >
    //                 <form action="#">
    //                   <div className="form-group">
    //                     <label htmlFor="singin-email">
    //                       Username or email address *
    //                     </label>
    //                     <input
    //                       type="text"
    //                       className="form-control input-error"
    //                       id="singin-email"
    //                       name="singin-email"
    //                       required
    //                     />
    //                     <p className="form-error">Please fill in this field</p>
    //                   </div>
    //                   {/* End .form-group */}
    //                   <div className="form-group">
    //                     <label htmlFor="singin-password">Password *</label>
    //                     <input
    //                       type="password"
    //                       className="form-control"
    //                       id="singin-password"
    //                       name="singin-password"
    //                       required
    //                     />
    //                   </div>
    //                   {/* End .form-group */}
    //                   <div className="form-footer">
    //                     <button
    //                       type="submit"
    //                       className="btn btn-outline-primary-2"
    //                     >
    //                       <span>LOG IN</span>
    //                       <i className="icon-long-arrow-right" />
    //                     </button>
    //                     <div className="custom-control custom-checkbox">
    //                       <input
    //                         type="checkbox"
    //                         className="custom-control-input"
    //                         id="signin-remember"
    //                       />
    //                       <label
    //                         className="custom-control-label"
    //                         htmlFor="signin-remember"
    //                       >
    //                         Remember Me
    //                       </label>
    //                     </div>
    //                     {/* End .custom-checkbox */}
    //                     <a href="#" className="forgot-link">
    //                       Forgot Your Password?
    //                     </a>
    //                   </div>
    //                   {/* End .form-footer */}
    //                 </form>
    //                 <div className="form-choice">
    //                   <p className="text-center">or sign in with</p>
    //                   <div className="row">
    //                     <div className="col-sm-6">
    //                       <a href="#" className="btn btn-login btn-g">
    //                         <i className="icon-google" />
    //                         Login With Google
    //                       </a>
    //                     </div>
    //                     {/* End .col-6 */}
    //                     <div className="col-sm-6">
    //                       <a href="#" className="btn btn-login btn-f">
    //                         <i className="icon-facebook-f" />
    //                         Login With Facebook
    //                       </a>
    //                     </div>
    //                     {/* End .col-6 */}
    //                   </div>
    //                   {/* End .row */}
    //                 </div>
    //                 {/* End .form-choice */}
    //               </div>
    //               {/* .End .tab-pane */}
    //               <div
    //                 className="tab-pane fade"
    //                 id="register"
    //                 role="tabpanel"
    //                 aria-labelledby="register-tab"
    //               >
    //                 <form action="#">
    //                   <div className="form-group">
    //                     <label htmlFor="register-email">
    //                       Your email address *
    //                     </label>
    //                     <input
    //                       type="email"
    //                       className="form-control input-error"
    //                       id="register-email"
    //                       name="register-email"
    //                       required
    //                     />
    //                     <p className="form-error">Please fill in this field</p>
    //                   </div>
    //                   {/* End .form-group */}
    //                   <div className="form-group">
    //                     <label htmlFor="register-password">Password *</label>
    //                     <input
    //                       type="password"
    //                       className="form-control"
    //                       id="register-password"
    //                       name="register-password"
    //                       required
    //                     />
    //                   </div>
    //                   {/* End .form-group */}
    //                   <div className="form-footer">
    //                     <button
    //                       type="submit"
    //                       className="btn btn-outline-primary-2"
    //                     >
    //                       <span>SIGN UP</span>
    //                       <i className="icon-long-arrow-right" />
    //                     </button>
    //                     <div className="custom-control custom-checkbox">
    //                       <input
    //                         type="checkbox"
    //                         className="custom-control-input"
    //                         id="register-policy"
    //                         required
    //                       />
    //                       <label
    //                         className="custom-control-label"
    //                         htmlFor="register-policy"
    //                       >
    //                         I agree to the
    //                         <a href="privacy-policy.html">privacy policy</a> *
    //                       </label>
    //                     </div>
    //                     {/* End .custom-checkbox */}
    //                   </div>
    //                   {/* End .form-footer */}
    //                 </form>
    //                 <div className="form-choice">
    //                   <p className="text-center">or sign in with</p>
    //                   <div className="row">
    //                     <div className="col-sm-6">
    //                       <a href="#" className="btn btn-login btn-g">
    //                         <i className="icon-google" />
    //                         Login With Google
    //                       </a>
    //                     </div>
    //                     {/* End .col-6 */}
    //                     <div className="col-sm-6">
    //                       <a href="#" className="btn btn-login  btn-f">
    //                         <i className="icon-facebook-f" />
    //                         Login With Facebook
    //                       </a>
    //                     </div>
    //                     {/* End .col-6 */}
    //                   </div>
    //                   {/* End .row */}
    //                 </div>
    //                 {/* End .form-choice */}
    //               </div>
    //               {/* .End .tab-pane */}
    //             </div>
    //             {/* End .tab-content */}
    //           </div>
    //           {/* End .form-tab */}
    //         </div>
    //         {/* End .form-box */}
    //       </div>
    //       {/* End .modal-body */}
    //     </div>
    //     {/* End .modal-content */}
    //   </div>
    //   {/* End .modal-dialog */}
    // </div>
  );
};

export default AuthModal;
