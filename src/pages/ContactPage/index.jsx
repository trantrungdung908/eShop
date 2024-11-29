import BreadCrumb from "@/components/BreadCrumb";
import { PATHS } from "@/constants/path";
import React from "react";
import { Link } from "react-router-dom";
import ContactForm from "./components/ContactForm";

const ContactPage = () => {
  return (
    <main className="main">
      <BreadCrumb>
        <BreadCrumb.Item>
          <Link to={PATHS.HOME}>Home</Link>
        </BreadCrumb.Item>

        <BreadCrumb.Item isActive>Contact us</BreadCrumb.Item>
      </BreadCrumb>
      <div className="container">
        <div
          className="page-header page-header-big text-center"
          style={{
            backgroundImage: 'url("assets/images/contact-header-bg.jpg")',
          }}
        >
          <h1 className="page-title text-white">
            Contact us <span className="text-white">keep in touch with us</span>
          </h1>
        </div>
      </div>
      <div className="page-content pb-0">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 mb-2 mb-lg-0">
              <h2 className="title mb-1">Contact Information</h2>
              <p className="mb-3">
                Vestibulum volutpat, lacus a ultrices sagittis, mi neque euismod
                dui, eu pulvinar nunc sapien ornare nisl. Phasellus pede arcu,
                dapibus eu, fermentum et, dapibus sed, urna.
              </p>
              <div className="row">
                <div className="col-sm-7">
                  <div className="contact-info">
                    <h3>The Office</h3>
                    <ul className="contact-list">
                      <li>
                        <i className="icon-map-marker" /> 70 Washington Square
                        South New York, NY 10012, United States
                      </li>
                      <li>
                        <i className="icon-phone" />
                        <a href="tel:#">+92 423 567</a>
                      </li>
                      <li>
                        <i className="icon-envelope" />
                        <a href="mailto:#">info@Molla.com</a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-sm-5">
                  <div className="contact-info">
                    <h3>The Office</h3>
                    <ul className="contact-list">
                      <li>
                        <i className="icon-clock-o" />
                        <span className="text-dark">Monday-Saturday</span>
                        <br />
                        11am-7pm ET
                      </li>
                      <li>
                        <i className="icon-calendar" />
                        <span className="text-dark">Sunday</span>
                        <br />
                        11am-6pm ET
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <h2 className="title mb-1">Got Any Questions?</h2>
              <p className="mb-2">
                Use the form below to get in touch with the sales team
              </p>
              <ContactForm />
            </div>
          </div>
          <hr className="mt-4 mb-5" />
          <div className="stores mb-4 mb-lg-5">
            <h2 className="title text-center mb-3">Our Stores</h2>
            <div className="row">
              <div className="col-lg-6">
                <div className="store">
                  <div className="row">
                    <div className="col-sm-5 col-xl-6">
                      <figure className="store-media mb-2 mb-lg-0">
                        <img src="assets/images/stores/img-1.jpg" alt="image" />
                      </figure>
                    </div>
                    <div className="col-sm-7 col-xl-6">
                      <div className="store-content">
                        <h3 className="store-title">Wall Street Plaza</h3>
                        <address>88 Pine St, New York, NY 10005, USA</address>
                        <div>
                          <a href="tel:#">+1 987-876-6543</a>
                        </div>
                        <h4 className="store-subtitle">Store Hours:</h4>
                        <div>Monday - Saturday 11am to 7pm</div>
                        <div>Sunday 11am to 6pm</div>
                        <a href="#" className="btn btn-link" target="_blank">
                          <span>View Map</span>
                          <i className="icon-long-arrow-right" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="store">
                  <div className="row">
                    <div className="col-sm-5 col-xl-6">
                      <figure className="store-media mb-2 mb-lg-0">
                        <img src="assets/images/stores/img-2.jpg" alt="image" />
                      </figure>
                    </div>
                    <div className="col-sm-7 col-xl-6">
                      <div className="store-content">
                        <h3 className="store-title">One New York Plaza</h3>
                        <address>88 Pine St, New York, NY 10005, USA</address>
                        <div>
                          <a href="tel:#">+1 987-876-6543</a>
                        </div>
                        <h4 className="store-subtitle">Store Hours:</h4>
                        <div>Monday - Friday 9am to 8pm</div>
                        <div>Saturday - 9am to 2pm</div>
                        <div>Sunday - Closed</div>
                        <a href="#" className="btn btn-link" target="_blank">
                          <span>View Map</span>
                          <i className="icon-long-arrow-right" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id="map">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d29793.988458863696!2d105.81636412920736!3d21.022738359984352!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab9bd9861ca1%3A0xe7887f7b72ca17a9!2zSMOgIE7hu5lpLCBWaeG7h3QgTmFt!5e0!3m2!1svi!2s!4v1732801458221!5m2!1svi!2s"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </main>
  );
};

export default ContactPage;
