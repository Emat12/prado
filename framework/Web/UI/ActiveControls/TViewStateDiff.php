<?php
/**
 * TActiveControlAdapter and TCallbackPageStateTracker class file.
 *
 * @author Wei Zhuo <weizhuo[at]gamil[dot]com>
 * @link http://www.pradosoft.com/
 * @copyright Copyright &copy; 2005-2014 PradoSoft
 * @license http://www.pradosoft.com/license/
 * @package System.Web.UI.ActiveControls
 */

/**
 * Calculates the viewstate changes during the request.
 *
 * @author Wei Zhuo <weizhuo[at]gmail[dot]com>
 * @package System.Web.UI.ActiveControls
 * @since 3.1
 */
abstract class TViewStateDiff
{
	/**
	 * @var mixed updated viewstate
	 */
	protected $_new;
	/**
	 * @var mixed viewstate value at the begining of the request.
	 */
	protected $_old;
	/**
	 * @var object null value.
	 */
	protected $_null;

	/**
	 * Constructor.
	 * @param mixed updated viewstate value.
	 * @param mixed viewstate value at the begining of the request.
	 * @param object representing the null value.
	 */
	public function __construct($new, $old, $null)
	{
		$this->_new = $new;
		$this->_old = $old;
		$this->_null = $null;
	}

	/**
	 * @return mixed view state changes, nullObject if no difference.
	 */
	public abstract function getDifference();
}