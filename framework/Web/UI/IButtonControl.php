<?php
/**
 * TControl, TControlCollection, TEventParameter and INamingContainer class file
 *
 * @author Qiang Xue <qiang.xue@gmail.com>
 * @link http://www.pradosoft.com/
 * @copyright Copyright &copy; 2005-2014 PradoSoft
 * @license http://www.pradosoft.com/license/
 * @package System.Web.UI
 */

/**
 * IButtonControl interface
 *
 * IButtonControl specifies the common properties and events that must
 * be implemented by a button control, such as {@link TButton}, {@link TLinkButton},
 * {@link TImageButton}.
 *
 * @author Qiang Xue <qiang.xue@gmail.com>
 * @package System.Web.UI
 * @since 3.0
 */
interface IButtonControl
{
	/**
	 * @return string caption of the button
	 */
	public function getText();

	/**
	 * @param string caption of the button
	 */
	public function setText($value);

	/**
	 * @return boolean whether postback event trigger by this button will cause input validation
	 */
	public function getCausesValidation();

	/**
	 * @param boolean whether postback event trigger by this button will cause input validation
	 */
	public function setCausesValidation($value);

	/**
	 * @return string the command name associated with the {@link onCommand OnCommand} event.
	 */
	public function getCommandName();

	/**
	 * @param string the command name associated with the {@link onCommand OnCommand} event.
	 */
	public function setCommandName($value);

	/**
	 * @return string the parameter associated with the {@link onCommand OnCommand} event
	 */
	public function getCommandParameter();

	/**
	 * @param string the parameter associated with the {@link onCommand OnCommand} event.
	 */
	public function setCommandParameter($value);

	/**
	 * @return string the group of validators which the button causes validation upon postback
	 */
	public function getValidationGroup();

	/**
	 * @param string the group of validators which the button causes validation upon postback
	 */
	public function setValidationGroup($value);

	/**
	 * Raises <b>OnClick</b> event.
	 * @param TEventParameter event parameter to be passed to the event handlers
	 */
	public function onClick($param);

	/**
	 * Raises <b>OnCommand</b> event.
	 * @param TCommandEventParameter event parameter to be passed to the event handlers
	 */
	public function onCommand($param);

	/**
	 * @param boolean set by a panel to register this button as the default button for the panel.
	 */
	public function setIsDefaultButton($value);

	/**
	 * @return boolean true if this button is registered as a default button for a panel.
	 */
	public function getIsDefaultButton();
}