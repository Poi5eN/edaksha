import React, { useRef, useState } from "react";

function Tables({
  thead,
  tbody,
  fs,
  getRowClass,
  style,
  tableHeight,
  scrollView,
  getRowClick,
  WWW,
  handleClassOnRow,
}) {
  const isMobile = window.innerWidth <= 768;
  const activeRowRef = useRef(null);

  // Function to handle row click
  const handleRowClick = (rowRef, ele, index) => {
    getRowClick && getRowClick(ele, index);

    // Reset the previous active row style if it exists
    if (activeRowRef.current) {
      // Reset the previous active row to its original color
      const originalColor = activeRowRef.current.getAttribute(
        "data-original-color"
      );
      activeRowRef.current.style.backgroundColor = originalColor;
    }

    // Set the new active row style
    if (rowRef) {
      // Store the original color of the new active row
      rowRef.setAttribute("data-original-color", rowRef.style.backgroundColor);
      rowRef.style.backgroundColor = "lightblue";
      activeRowRef.current = rowRef;
    }
  };

  return (
    tbody?.length > 0 && (
      <div
        id="no-more-tables"
        style={style}
        className={`overflow-auto ${tableHeight} ${scrollView} custom-scrollbar`}
      >
        <div className="grid">
          <div className="col-span-full">
            <table className="table-auto border-collapse w-full">
              <thead>
                <tr className="bg-gray-200">
                  {thead?.map((headData, index) => (
                    <th
                      key={index}
                      style={{
                        width: headData?.width ? headData?.width : "",
                        textAlign: headData?.textAlign
                          ? headData?.textAlign
                          : "",
                      }}
                      className={`px-2 py-1 font-semibold text-left ${
                        headData?.className ? headData?.className : ""
                      }`}
                    >
                      {headData?.name ? headData?.name : headData}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white">
                {tbody?.map((ele, index) => {
                  const keys = Object.keys(ele).filter(
                    (key) => key !== "colorcode"
                  ); // Exclude colorcode
                  const rowColor = ele.colorcode || ""; // Use colorcode if present
                  return (
                    <tr
                      key={index}
                      className={`${getRowClass ? getRowClass(ele, index) : ""}`}
                      style={{ backgroundColor: rowColor }}
                      onClick={(e) =>
                        handleRowClick(e.currentTarget, ele, index)
                      }
                    >
                      {keys?.map((bodyData, inx) => (
                        <td
                          key={inx}
                          data-title={
                            thead[inx]?.name ? thead[inx]?.name : thead[inx]
                          }
                          style={{ width: WWW }}
                          className={`px-2 py-1 ${
                            handleClassOnRow
                              ? handleClassOnRow(
                                  ele,
                                  thead[inx]?.name
                                    ? thead[inx]?.name
                                    : thead[inx]
                                )
                              : ""
                          }`}
                        >
                          {ele[bodyData]?.label ? (
                            ele[bodyData]?.label
                          ) : ele[bodyData] ? (
                            ele[bodyData]
                          ) : (
                            <>&nbsp;</>
                          )}
                          {isMobile && <>&nbsp;</>}
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  );
}

export default Tables;
