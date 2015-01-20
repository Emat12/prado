<?php
/**
 * Exception classes file
 *
 * @author Qiang Xue <qiang.xue@gmail.com>
 * @link http://www.pradosoft.com/
 * @copyright Copyright &copy; 2005-2014 PradoSoft
 * @license http://www.pradosoft.com/license/
 * @package System.Exceptions
 */

/**
 * TTemplateException class
 *
 * TTemplateException represents an exception caused by invalid template syntax.
 *
 * @author Qiang Xue <qiang.xue@gmail.com>
 * @package System.Exceptions
 * @since 3.1
 */
class TTemplateException extends TConfigurationException
{
	private $_template='';
	private $_lineNumber=0;
	private $_fileName='';

	/**
	 * @return string the template source code that causes the exception. This is empty if {@link getTemplateFile TemplateFile} is not empty.
	 */
	public function getTemplateSource()
	{
		return $this->_template;
	}

	/**
	 * @param string the template source code that causes the exception
	 */
	public function setTemplateSource($value)
	{
		$this->_template=$value;
	}

	/**
	 * @return string the template file that causes the exception. This could be empty if the template is an embedded template. In this case, use {@link getTemplateSource TemplateSource} to obtain the actual template content.
	 */
	public function getTemplateFile()
	{
		return $this->_fileName;
	}

	/**
	 * @param string the template file that causes the exception
	 */
	public function setTemplateFile($value)
	{
		$this->_fileName=$value;
	}

	/**
	 * @return integer the line number at which the template has error
	 */
	public function getLineNumber()
	{
		return $this->_lineNumber;
	}

	/**
	 * @param integer the line number at which the template has error
	 */
	public function setLineNumber($value)
	{
		$this->_lineNumber=TPropertyValue::ensureInteger($value);
	}
}