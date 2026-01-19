# 国际化 (i18n) 开发指南

本文档说明如何在 NetBird Dashboard 中添加国际化支持。

## 添加翻译的步骤

### 1. 在组件中导入 useLanguage

```typescript
import { useLanguage } from "@/contexts/LanguageProvider";
```

### 2. 在组件中使用 t 函数

```typescript
export default function MyComponent() {
  const { t } = useLanguage();

  return (
    <button>{t("common.save", "Save")}</button>
  );
}
```

### 3. 翻译函数语法

- `t("key.in.translations", "Fallback English text")`
- 第一个参数是翻译键（用于查找翻译）
- 第二个参数是回退文本（如果没有找到翻译则显示此文本）

### 4. 常用的翻译键

#### 通用操作

- `t("common.save", "Save")` - 保存
- `t("common.cancel", "Cancel")` - 取消
- `t("common.delete", "Delete")` - 删除
- `t("common.edit", "Edit")` - 编辑
- `t("common.add", "Add")` - 添加
- `t("common.close", "Close")` - 关闭
- `t("common.confirm", "Confirm")` - 确认
- `t("common.search", "Search")` - 搜索
- `t("common.refresh", "Refresh")` - 刷新

#### 用户相关

- `t("user.logout", "Logout")` - 退出登录
- `t("user.settings", "Settings")` - 设置
- `t("user.profile", "Profile")` - 个人资料
- `t("user.login", "Login")` - 登录

#### 消息提示

- `t("msg.success", "Success")` - 成功
- `t("msg.error", "Error")` - 错误
- `t("msg.loading", "Loading...")` - 加载中
- `t("msg.saved_successfully", "Saved successfully")` - 保存成功
- `t("msg.deleted_successfully", "Deleted successfully")` - 删除成功

### 5. 添加新的翻译键

在 `src/contexts/LanguageProvider.tsx` 中添加到 translations 对象：

```typescript
const translations: Record<string, Record<string, string>> = {
  en: {
    "your.key.here": "Your English Text Here",
  },
  zh: {
    "your.key.here": "你的中文文本",
  },
};
```

### 6. 语言切换按钮使用

在 Header 中使用语言切换按钮：

```typescript
import SimpleLanguageToggle from "@components/SimpleLanguageToggle";
import { useLanguage } from "@/contexts/LanguageProvider";

export default function Header() {
  const { currentLanguage, setLanguage } = useLanguage();

  return (
    <SimpleLanguageToggle
      currentLanguage={currentLanguage}
      onLanguageChange={setLanguage}
    />
  );
}
```

## 示例

### 按钮示例

```typescript
import Button from "@components/Button";
import { useLanguage } from "@/contexts/LanguageProvider";

export default function ActionButtons() {
  const { t } = useLanguage();

  return (
    <div className="flex gap-2">
      <Button variant="primary">
        {t("common.save", "Save")}
      </Button>
      <Button variant="secondary">
        {t("common.cancel", "Cancel")}
      </Button>
    </div>
  );
}
```

### 模态框示例

```typescript
import { useLanguage } from "@/contexts/LanguageProvider";
import { ModalHeader, ModalFooter } from "@components/modal/Modal";

export default function MyModal() {
  const { t } = useLanguage();

  return (
    <div>
      <ModalHeader
        title={t("modal.title", "My Modal")}
        description={t("modal.description", "Modal description")}
      />
      {/* 内容 */}
      <ModalFooter>
        <button>{t("common.cancel", "Cancel")}</button>
        <button>{t("common.confirm", "Confirm")}</button>
      </ModalFooter>
    </div>
  );
}
```

## 注意事项

1. **始终提供回退文本**: 即使还没有翻译，也应该提供英文回退文本
2. **使用有意义的键名**: 使用点分命名法，如 `"module.action.description"`
3. **保持一致性**: 相同含义的文本使用相同的翻译键
4. **测试语言切换**: 更改语言后确保 UI 正确更新
