import Image from "next/image";

const Tabs = () => {

  return (
    <div className="accordion payment1" id="accordionExample">
      <div className="accordion-item">
        <h2 className="accordion-header" id="headingOne">
          <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
            <div className="p1_head">
              <div className="auth_form_radio">
                <input className="form-check-input" defaultChecked type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                <label className="form-check-label" htmlFor="flexRadioDefault1">

                </label>
                <h5>Credit card</h5>
              </div>
              <Image
                src="/images/payment_cards.png"
                width={375.56}
                height={40.13}
                className="pb-icon"
                alt="Frame"
              />
            </div>
          </button>
        </h2>
        <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
          <div className="accordion-body p-0">
            <div className="payment1_body">
              <div className="row gy-4">
                <div className="col-12">
                  <input type="text" placeholder='Card number' />
                </div>
                <div className="col-6">
                  <input type="text" placeholder='Expiration date (MM / YY)' />
                </div>
                <div className="col-6">
                  <input type="text" placeholder='Security code' />
                </div>
                <div className="col-12">
                  <input type="text" placeholder='Name on card' />
                </div>
                <div className="col-12">
                  <div className="auth_form_radio pt-1 position-relative">
                    <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" />
                    <label className="form-check-label text-start ps-5" htmlFor="flexRadioDefault2">
                      Use shipping address as billing address
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="accordion-item">
        <h2 className="accordion-header" id="headingTwo">
          <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
            <div className="p1_head p2_head" >
              <div className="auth_form_radio">
                <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" />
                <label className="form-check-label" htmlFor="flexRadioDefault2">

                </label>
                <h5>Paypal</h5>
              </div>
              <Image
                src="/images/paypal.png"
                width={80.51}
                height={21}
                className="pb-icon"
                alt="Frame"
              />
            </div>
          </button>
        </h2>
        <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
          <div className="accordion-body  p-0">
            <div className="payment1_body">
              <div className="row gy-4">
                <div className="col-12">
                  <input type="text" placeholder='Card number' />
                </div>
                <div className="col-6">
                  <input type="text" placeholder='Expiration date (MM / YY)' />
                </div>
                <div className="col-6">
                  <input type="text" placeholder='Security code' />
                </div>
                <div className="col-12">
                  <input type="text" placeholder='Name on card' />
                </div>
                <div className="col-12">
                  <div className="auth_form_radio pt-1 position-relative">
                    <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" />
                    <label className="form-check-label text-start ps-5" htmlFor="flexRadioDefault2">
                      Use shipping address as billing address
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="accordion-item">
        <h2 className="accordion-header" id="headingThree">
          <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
            <div className="p1_head p2_head" style={{ paddingTop: '12px', paddingBottom: '12px' }}>
              <div className="auth_form_radio">
                <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault3" />
                <label className="form-check-label" htmlFor="flexRadioDefault3">

                </label>
                <h5>Credit / Debit Card</h5>
              </div>
              <Image
                src="/images/visa-icon.png"
                width={71.85}
                height={54}
                className="pb-icon"
                alt="Frame"
              />
            </div>
          </button>
        </h2>
        <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
          <div className="accordion-body  p-0">
            <div className="payment1_body">
              <div className="row gy-4">
                <div className="col-12">
                  <input type="text" placeholder='Card number' />
                </div>
                <div className="col-6">
                  <input type="text" placeholder='Expiration date (MM / YY)' />
                </div>
                <div className="col-6">
                  <input type="text" placeholder='Security code' />
                </div>
                <div className="col-12">
                  <input type="text" placeholder='Name on card' />
                </div>
                <div className="col-12">
                  <div className="auth_form_radio pt-1 position-relative">
                    <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" />
                    <label className="form-check-label text-start ps-5" htmlFor="flexRadioDefault2">
                      Use shipping address as billing address
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tabs;
