/**
 * @constructor
 * @base DynamicView
 * @param config
 */
var DynamicTableRow = function(config) {
	this.config = config;
	this.cells = [];
	this.initialize();
};

DynamicTableRow.prototype = new DynamicView();

/**
 * Set up row DOM container element
 */
DynamicTableRow.prototype.initialize = function() {
	this.element = $("<div />").addClass(DynamicTable.cssClasses.tableRow);
	this.element.data("row", this);
};

/**
 * Hide row
 */
DynamicTableRow.prototype.hide = function() {
	this.element.hide();
};

/**
 * Show row
 */
DynamicTableRow.prototype.show = function() {
	this.element.show();
};

/**
 * Render row cells
 */
DynamicTableRow.prototype.render = function() {
	for(var i = 0; i < this.cells.length; i++) {
		this.cells[i].render();
	}
};

/**
 * Update row and cell styles
 */
DynamicTableRow.prototype.layout = function() {
	
};

/**
 * Create a new cell
 */
DynamicTableRow.prototype.createCell = function(config) {
	var cell = new DynamicTableCell(this, config);
	cell.getElement().appendTo(this.element);
	this.cells.push(cell);
};

/**
 * Create cells from table configuration
 */
DynamicTableRow.prototype.autoCreateCells = function() {
	for(var i = 0; i < this.config.length; i ++) {
		this.createCell(this.config[i]);
	}
};

DynamicTableRow.prototype.getCell = function(index) {
  return this.cells[index];
};
/**
 * Remove row
 */
DynamicTableRow.prototype.remove = function() {
	this.getParentView().removeRow(this);
	this.element.remove();
};

DynamicTableRow.prototype.onEdit = function() {
	this.render();
};
DynamicTableRow.prototype.onDelete = function() {
	this.remove();
};

DynamicTableRow.prototype._applyToAllCells = function(command) {
  var retVal = true;
  for(var i = 0; i < this.cells.length; i++) {
    retVal = retVal && command.apply(this.cells[i]);
  }
  return retVal;
};

DynamicTableRow.prototype.editRow = function() {
  this._applyToAllCells(DynamicTableCell.prototype.openEditor);
};

DynamicTableRow.prototype.closeRowEdit = function() {
  this._applyToAllCells(DynamicTableCell.prototype.closeEditor);
};

DynamicTableRow.prototype.saveRowEdit = function() {
  var isValid = this._applyToAllCells(DynamicTableCell.prototype.isEditorValueValid);
  if(isValid) {
    return this._applyToAllCells(DynamicTableCell.prototype.saveEditorValue);
  }
  return false;
};