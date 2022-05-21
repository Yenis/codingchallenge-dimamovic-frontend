import React, { useEffect } from "react";

export interface ToastProps {
  id: string;
  destroy: () => void;
  type: string;
  content: string;
  duration?: number;
}

const Toast: React.FC<ToastProps> = (props) => {
  const { destroy, content, type, duration = 5000 } = props;

  useEffect(() => {
    if (!duration) return;

    const timer = setTimeout(() => {
      destroy();
    }, duration);

    return () => clearTimeout(timer);
  }, [destroy, duration]);

  return (
    <div>
      <div className={"toast-header"}>
        <div>{type}</div>
        <button className="toast-button" onClick={destroy}>X</button>
      </div>
      <div className={"toast-body"}>{content}</div>
    </div>
  );
};

export default Toast;