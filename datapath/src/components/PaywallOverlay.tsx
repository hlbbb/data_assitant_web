import './PaywallOverlay.css';
import { XHS_SHOP_LINK, PRICING } from '../config/purchase';

interface PaywallOverlayProps {
  visible: boolean;
  stageTitle: string;
  onClose: () => void;
  onPurchase: () => void;
  onActivate: () => void;
}

export default function PaywallOverlay({ visible, stageTitle, onClose, onPurchase: _onPurchase, onActivate }: PaywallOverlayProps) {
  if (!visible) return null;

  return (
    <div className="paywall-overlay" onClick={onClose}>
      <div className="paywall-card" onClick={(e) => e.stopPropagation()}>
        <button className="paywall-card__close" onClick={onClose} aria-label="关闭">
          ✕
        </button>

        <div className="paywall-card__icon">🔒</div>

        <h2 className="paywall-card__title">解锁「{stageTitle}」</h2>
        <p className="paywall-card__subtitle">解锁全站内容，终身访问</p>

        <div className="paywall-card__price">
          <span className="paywall-card__price-label">⭐ 终身会员</span>
          <span className="paywall-card__price-symbol">{PRICING.currency}</span>
          <span className="paywall-card__price-value">{PRICING.currentPrice}</span>
        </div>

        <div className="paywall-card__actions">
          <a
            href={XHS_SHOP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="paywall-card__btn paywall-card__btn--xhs"
          >
            <span className="paywall-card__btn-icon">🛒</span>
            前往小红书购买
          </a>
          <button className="paywall-card__btn paywall-card__btn--secondary" onClick={onActivate}>
            输入激活码
          </button>
        </div>

        <p className="paywall-card__footer-text">
          包含 SQL 8个阶段 + Python 18个模块 + 思维模型 24个模型 + 刷题功能 + 实战项目
        </p>
      </div>
    </div>
  );
}
