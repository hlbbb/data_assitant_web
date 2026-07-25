import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { activateCode, isUnlocked } from '../utils/access';
import { useAuth } from '../contexts/AuthContext';
import { XHS_SHOP_LINK, PRICING } from '../config/purchase';
import AuthModal from '../components/AuthModal';
import './PurchasePage.css';

const PurchasePage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [codeInput, setCodeInput] = useState('');
  const [activating, setActivating] = useState(false);
  const [activateResult, setActivateResult] = useState<{ success: boolean; message: string } | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);

  const handleActivate = async () => {
    if (!codeInput.trim()) return;

    if (!user) {
      setActivateResult({ success: false, message: '请先登录或注册账号后再激活' });
      setShowAuthModal(true);
      return;
    }

    setActivating(true);
    const result = await activateCode(codeInput.trim(), user.id);
    setActivateResult(result);
    setActivating(false);
    if (result.success && isUnlocked()) {
      navigate('/');
    }
  };

  return (
    <div className="purchase">
      <div className="purchase__breadcrumb">
        <Link to="/">首页</Link>
        <span className="purchase__breadcrumb-sep">/</span>
        <span>解锁全站内容</span>
      </div>

      <section className="purchase__hero">
        <h1 className="purchase__hero-title">解锁 DataPath 全部内容</h1>
        <p className="purchase__hero-subtitle">一次购买，终身访问，持续更新</p>
      </section>

      <section className="purchase__value-cards">
        <div className="purchase__value-card">
          <span className="purchase__value-icon">📚</span>
          <h3 className="purchase__value-title">50+ 学习模块</h3>
          <p className="purchase__value-desc">SQL 8阶段 + Python 18模块 + 思维模型 24个</p>
        </div>
        <div className="purchase__value-card">
          <span className="purchase__value-icon">💻</span>
          <h3 className="purchase__value-title">在线练习环境</h3>
          <p className="purchase__value-desc">SQL + Python 浏览器内直接运行</p>
        </div>
        <div className="purchase__value-card">
          <span className="purchase__value-icon">🎯</span>
          <h3 className="purchase__value-title">实战项目</h3>
          <p className="purchase__value-desc">RFM分析、AARRR模型、LTV/CAC分析</p>
        </div>
      </section>

      <section className="purchase__pricing">
        <div className="purchase__pricing-card">
          <div className="purchase__price-row">
            <span className="purchase__pricing-badge purchase__pricing-badge--lifetime">
              ⭐ 终身会员
            </span>
            <span className="purchase__price-symbol">{PRICING.currency}</span>
            <span className="purchase__price">{PRICING.currentPrice}</span>
          </div>
          <ul className="purchase__includes">
            <li className="purchase__includes-item">✓ SQL 全部 8 个阶段</li>
            <li className="purchase__includes-item">✓ Python 全部 18 个模块</li>
            <li className="purchase__includes-item">✓ 思维模型全部 24 个模型</li>
            <li className="purchase__includes-item">✓ 刷题功能无限使用</li>
            <li className="purchase__includes-item">✓ 实战项目完整源码与数据</li>
            <li className="purchase__includes-item">✓ 后续更新免费获取</li>
          </ul>

          {/* 小红书购买按钮 */}
          <a
            href={XHS_SHOP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="purchase__buy-btn purchase__buy-btn--xhs"
          >
            <span className="purchase__buy-btn-icon">🛒</span>
            前往小红书店铺购买
          </a>

          {/* 购买流程说明 */}
          <div className="purchase__flow">
            <div className="purchase__flow-title">购买流程</div>
            <div className="purchase__flow-steps">
              <div className="purchase__flow-step">
                <span className="purchase__flow-step-num">1</span>
                <span className="purchase__flow-step-text">点击上方按钮前往小红书店铺</span>
              </div>
              <div className="purchase__flow-step">
                <span className="purchase__flow-step-num">2</span>
                <span className="purchase__flow-step-text">下单购买会员激活码</span>
              </div>
              <div className="purchase__flow-step">
                <span className="purchase__flow-step-num">3</span>
                <span className="purchase__flow-step-text">收到激活码后在此页面激活</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="purchase__activation">
        <h3 className="purchase__activation-title">已有激活码？</h3>
        <div className="purchase__activation-form">
          <input
            className="purchase__activation-input"
            type="text"
            placeholder="输入激活码 (格式: DP-XXXXXXXX)"
            value={codeInput}
            onChange={(e) => setCodeInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') handleActivate() }}
          />
          <button className="purchase__activation-btn" onClick={handleActivate} disabled={activating}>
            {activating ? '激活中...' : '激活'}
          </button>
        </div>
        {activateResult && (
          <div className={`purchase__activation-result ${activateResult.success ? 'purchase__activation-result--success' : 'purchase__activation-result--error'}`}>
            {activateResult.message}
          </div>
        )}
      </section>

      {/* 登录弹窗 */}
      <AuthModal
        visible={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />

      <section className="purchase__faq">
        <h3 className="purchase__faq-title">常见问题</h3>
        <div className="purchase__faq-item">
          <h4 className="purchase__faq-question">购买后有效期多久？</h4>
          <p className="purchase__faq-answer">终身有效，一次购买永久访问。</p>
        </div>
        <div className="purchase__faq-item">
          <h4 className="purchase__faq-question">支持退款吗？</h4>
          <p className="purchase__faq-answer">7天内不满意可联系客服退款。</p>
        </div>
        <div className="purchase__faq-item">
          <h4 className="purchase__faq-question">后续新增内容需要额外付费吗？</h4>
          <p className="purchase__faq-answer">不需要，现有模块范围内免费更新。</p>
        </div>
      </section>
    </div>
  );
};

export default PurchasePage;
