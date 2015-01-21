<?php
/**
 * TDataGrid related class files.
 * This file contains the definition of the following classes:
 * TDataGrid, TDataGridItem, TDataGridItemCollection, TDataGridColumnCollection,
 * TDataGridPagerStyle, TDataGridItemEventParameter,
 * TDataGridCommandEventParameter, TDataGridSortCommandEventParameter,
 * TDataGridPageChangedEventParameter
 *
 * @author Qiang Xue <qiang.xue@gmail.com>
 * @link http://www.pradosoft.com/
 * @copyright Copyright &copy; 2005-2014 PradoSoft
 * @license http://www.pradosoft.com/license/
 * @package Prado\Web\UI\WebControls
 */

namespace Prado\Web\UI\WebControls;

/**
 * TDataGridSortCommandEventParameter class
 *
 * TDataGridSortCommandEventParameter encapsulates the parameter data for
 * {@link TDataGrid::onSortCommand SortCommand} event of {@link TDataGrid} controls.
 *
 * The {@link getCommandSource CommandSource} property refers to the control
 * that originally raises the OnCommand event, while {@link getSortExpression SortExpression}
 * gives the sort expression carried with the sort command.
 *
 * @author Qiang Xue <qiang.xue@gmail.com>
 * @package Prado\Web\UI\WebControls
 * @since 3.0
 */
class TDataGridSortCommandEventParameter extends TEventParameter
{
	/**
	 * @var string sort expression
	 */
	private $_sortExpression='';
	/**
	 * @var TControl original event sender
	 */
	private $_source=null;

	/**
	 * Constructor.
	 * @param TControl the control originally raises the <b>OnCommand</b> event.
	 * @param TDataGridCommandEventParameter command event parameter
	 */
	public function __construct($source,TDataGridCommandEventParameter $param)
	{
		$this->_source=$source;
		$this->_sortExpression=$param->getCommandParameter();
	}

	/**
	 * @return TControl the control originally raises the <b>OnCommand</b> event.
	 */
	public function getCommandSource()
	{
		return $this->_source;
	}

	/**
	 * @return string sort expression
	 */
	public function getSortExpression()
	{
		return $this->_sortExpression;
	}
}