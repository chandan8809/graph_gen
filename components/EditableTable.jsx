import React from 'react';

const EditableTable = ({ tableData, selectedCell, editValue, onCellClick, onCellChange, onEndEdit, onKeyPress }) => {
  return (
    <div className="w-full overflow-x-auto mb-8">
      <table className="border-collapse w-full">
        <tbody>
          {tableData.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, colIndex) => (
                <td
                  key={colIndex}
                  className={`border border-gray-300 p-2 h-10 min-w-16 ${
                    rowIndex === 0 || colIndex === 0 
                      ? 'bg-gray-100 font-medium' 
                      : 'bg-white'
                  }`}
                  onClick={() => onCellClick(rowIndex, colIndex)}
                >
                  {selectedCell &&
                   selectedCell.row === rowIndex &&
                   selectedCell.col === colIndex ? (
                    <div className="w-full h-full  border border-gray-300">
                      <input
                        type="text"
                        value={editValue}
                        onChange={onCellChange}
                        onBlur={onEndEdit}
                        onKeyPress={onKeyPress}
                        className="w-full h-full border-none p-0 focus:outline-none bg-transparent"
                        style={{maxWidth: '100%'}}
                        autoFocus
                      />
                    </div>
                  ) : (
                    cell
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EditableTable;