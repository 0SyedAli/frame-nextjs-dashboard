import Image from 'next/image'
import React from 'react'

const EmployeeDetail = () => {
    return (
        <>
            <div className="employee_detial w-100">
                <div className="ed_item align-items-center" style={{ width: "fit-content" }}>
                    <Image
                        src="/images/unknown_user.jpg"
                        width={144}
                        height={144}
                        className="emp_img"
                        alt="default"
                    />
                    <h5>default</h5>
                </div>
                <div className="ed_table">
                    <table>
                        <tbody>
                            <tr>
                                <td>Working Days</td>
                                <th>Sun, 1 Dec</th>
                                <th>Mon, 2 Dec</th>
                                <th>Tue, 3 Dec</th>
                                <th>Wed, 4 Dec</th>
                                <th>Thu, 5 Dec</th>
                                <th>Fri, 6 Dec</th>
                                <th>Sat, 7 Dec</th>
                            </tr>
                            <tr>
                                <td>Hours of Operation</td>
                                <td><div className="label">09 AM - 06 PM</div></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className='ed_control'>
                    <label >About Employee</label>
                    <textarea rows="4">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </textarea>
                </div>
                {/* <div className='ed_control'>
                    <label >Stylist Message Access</label>
                    <div className="es_select">
                        <select name="" id="">
                            <option value=""></option>
                            <option value="">abc 1</option>
                            <option value="">abc 2</option>
                            <option value="">abc 3</option>
                        </select>
                    </div>
                </div> */}
            </div>
        </>
    )
}

export default EmployeeDetail